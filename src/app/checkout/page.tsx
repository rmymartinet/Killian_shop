"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import Swal from "sweetalert2";
import { useCart } from "../context/CartContext";
import { useFilteredData } from "../hooks/useFilteredData";
import { useRemoveFromCart } from "../hooks/useRemoveFromCart";

export default function Checkout() {
  const { cart } = useCart();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [guestModal, setGuestModal] = useState<boolean>(false);
  const [showAuthOptions, setShowAuthOptions] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const removeItemFromCart = useRemoveFromCart();
  const { openSignIn } = useClerk();
  const { data } = useFilteredData();
  const allProducts = cart.flat().map((item) => item.id);
  const compare = data.filter((item) => allProducts.includes(item.id));
  const outOfStockProduct = compare.find((item) => item.quantity === 0);

  const deliveryCost = 5;
  const currentUser = useUser();
  const currentUserEmail =
    currentUser?.user?.primaryEmailAddress?.emailAddress || email;

  // Calculer le montant total basé sur le panier sans ajouter les frais de livraison ici
  useEffect(() => {
    const total = cart
      .flat()
      .reduce((acc, item) => acc + Number(item.price), 0);

    setTotalAmount(Number(total.toFixed(2)));
  }, [cart]);

  const handleCloseModal = () => {
    setShowAuthOptions(false);
    setIsGuest(false);
    setEmail("");
    setEmailError(null);
    setGuestModal(false);
  };

  // Afficher les options de connexion ou de continuer en tant qu'invité
  function handleAuthOptions() {
    setShowAuthOptions(true);
  }

  // Fonction pour valider l'email
  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour valider l'email
    return emailPattern.test(email);
  };

  async function handleEmailVerification() {
    if (!email) {
      setEmailError("Veuillez entrer une adresse email.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Veuillez entrer une adresse email valide.");
      return;
    }

    setEmailError(null);
    try {
      const response = await fetch("/api/users/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }

      const data = await response.json();

      if (data.exists) {
        setIsGuest(false);
        setGuestModal(false);
        Swal.fire({
          title: "Cette adresse mail existe déjà",
          text: "Connectez-vous pour continuer",
          icon: "error",
          confirmButtonText: "OK",
        }).then(() => {
          handleAuthOptions();
        });
        return;
      } else {
        checkout();
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email :", error);
    }
  }

  async function checkout() {
    setLoading(true);

    // Si personne n'est connecté et qu'aucun invité n'est défini
    if (!isGuest && !currentUser.isSignedIn) {
      handleAuthOptions(); // Affiche la boîte de dialogue
      setLoading(false);
      return;
    }

    try {
      // Vérification du stock
      if (outOfStockProduct) {
        Swal.fire({
          title: "Erreur!",
          text: `Stock insuffisant pour : ${outOfStockProduct.title} Veillez à retirer cet article de votre panier`,
          icon: "error",
          confirmButtonText: "OK",
        });
        setLoading(false);
        throw new Error("Stock insuffisant");
      }

      // Vérification des prix pour les passer à la session de paiement
      const products = cart.flat();

      if (products.some((product) => product.price === undefined)) {
        console.error("Un ou plusieurs produits n'ont pas de prix défini.");
        setLoading(false);
        return;
      }

      // Création de la session de paiement
      const response = await fetch(`/api/checkout_sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products,
          deliveryCost,
          currentUserEmail,
        }),
      });

      const data = await response.json();

      if (data?.url) {
        const url = data.url;
        setLoading(false);
        window.location.href = url;
      }
    } catch (error) {
      console.error(
        "Erreur lors de la création de la session de paiement :",
        error
      );
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-40 justify-center w-full overflow-hidden mt-[10vh] md:mt-[30vh] h-full px-4 md:px-20">
        <div className="flex flex-col w-full gap-10 overflow-y-auto whitespace-nowrap">
          {cart.length > 0 ? (
            <>
              {cart.flat().map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-10 pb-4 border-b border-black h-[20vh] w-full"
                >
                  <div className="bg-[#fafafa] h-full">
                    <Image
                      width={300}
                      height={300}
                      src={item?.imageDetails?.[0] ?? ""}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-between h-full w-full">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-md text-center font-normal">
                        {item.title}
                      </h3>
                      <p className="text-base text-center font-normal">
                        {item.price} €
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p>Quantité : 1</p>
                      <button
                        onClick={() => removeItemFromCart(item.id)}
                        className="underline mb-2 cursor-pointer text-sm"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p>Votre panier est vide</p>
            </div>
          )}
        </div>
        <div className="flex flex-col px-2 gap-8 w-full bg-white sticky bottom-0">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p>Frais de livraison: </p>
              <p>{deliveryCost},00 €</p>
            </div>

            <div className="flex items-center justify-between">
              <p>Total:</p>
              <p>{totalAmount + deliveryCost},00 €</p>
            </div>
          </div>
          <button
            onClick={checkout}
            className={`cursor-pointer bg-black px-4 py-3 w-full text-white ${
              cart.length === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading || cart.length === 0}
          >
            {loading ? "Chargement..." : "Payer"}
          </button>
        </div>
      </div>
      {/* Modal pour les options de connexion/invité */}
      {showAuthOptions && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <div
              onClick={() => handleCloseModal()}
              className="absolute top-0 right-0 p-2 cursor-pointer"
            >
              <CgClose size={12} />
            </div>
            <div className="bg-white p-6 rounded-md">
              <h3 className="mb-4 rounded-xl">
                Se connecter ou continuer en tant qu&apos;invité
              </h3>
              <button
                onClick={() => openSignIn()}
                className="bg-black text-white rounded-xl px-4 py-2 mr-4"
              >
                Se connecter
              </button>
              <button
                onClick={() => {
                  setIsGuest(true);
                  setShowAuthOptions(false);
                  setGuestModal(true);
                }}
                className="bg-gray-500 text-white rounded-xl px-4 py-2"
              >
                Continuer en tant qu&apos;invité
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour les invités */}
      {guestModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <div
              onClick={() => handleCloseModal()}
              className="absolute top-0 right-0 cursor-pointer p-2"
            >
              <CgClose size={12} />
            </div>
            <div className="bg-white p-6 rounded-md">
              <h3 className="mb-4">Entrer votre adresse e-mail</h3>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(null);
                }}
                placeholder="Entrez votre e-mail"
                className={`w-full mb-4 p-2 border rounded-md ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
              />
              {emailError && <p className="text-red-500 mb-2">{emailError}</p>}
              {/* Afficher le message d'erreur */}
              <button
                onClick={handleEmailVerification}
                className="bg-black text-white rounded-xl px-4 py-2 cursor-pointer"
                disabled={loading || !email}
              >
                {loading ? "Vérification..." : "Continuer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
