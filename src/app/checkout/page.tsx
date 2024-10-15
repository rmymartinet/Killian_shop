"use client";

import { useAuth, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCart } from "../context/CartContext";
import { useFilteredData } from "../hooks/useFilteredData";
import { useRemoveFromCart } from "../hooks/useRemoveFromCart";

export default function Checkout() {
  const { cart } = useCart();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(false); // Nouveau state pour l'invité
  const [showAuthOptions, setShowAuthOptions] = useState<boolean>(false); // Pour afficher les options d'auth
  const removeItemFromCart = useRemoveFromCart();
  const { openSignIn } = useClerk();
  const { userId } = useAuth();

  const deliveryCost = 5;

  const { data } = useFilteredData();
  const allProducts = cart.flat().map((item) => item.id);
  const compare = data.filter((item) => allProducts.includes(item.id));
  const outOfStockProduct = compare.find((item) => item.quantity === 0);

  // Calculer le montant total basé sur le panier sans ajouter les frais de livraison ici
  useEffect(() => {
    const total = cart
      .flat()
      .reduce((acc, item) => acc + Number(item.price), 0);

    setTotalAmount(Number(total.toFixed(2))); // Sans ajouter deliveryCost ici
  }, [cart]);

  // Afficher les options de connexion ou de continuer en tant qu'invité
  function handleAuthOptions() {
    setShowAuthOptions(true);
  }

  async function checkout() {
    setLoading(true);

    if (!userId && !isGuest) {
      handleAuthOptions(); // Affiche les options de connexion ou d'invité
      setLoading(false);
      return;
    }

    try {
      if (!isGuest && userId) {
        const userResponse = await fetch(`/api/users/${userId}`);
        const userData = await userResponse.json();

        if (!userData || userData.message === "Utilisateur non trouvé") {
          openSignIn();
          setLoading(false);
          return;
        }
      }

      if (outOfStockProduct) {
        Swal.fire({
          title: "Erreur!",
          text: `Stock insuffisant pour : ${outOfStockProduct.title} Veillez à retirer cet article de votre panier`,
          icon: "error",
          confirmButtonText: "OK",
        });
        setLoading(false);
        return;
      }

      const products = cart.flat();

      for (const product of products) {
        if (product.price === undefined) {
          console.error(`Prix non défini pour : ${product.title}`);
          return;
        }
      }

      const response = await fetch(`/api/checkout_sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products,
          userId: isGuest ? null : userId,
          deliveryCost,
        }), // Si invité, pas d'userId
      });

      const data = await response.json();

      if (data?.url) {
        const url = data.url;
        setLoading(false);
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  }

  return (
    <section className="fixed top-0 left-0 h-[100dvh] w-[100dvw] -z-10">
      <div className="flex flex-col items-center justify-end w-full overflow-hidden h-full">
        <div className="grid grid-flow-col md:flex border border-black w-full h-[60%] overflow-x-auto whitespace-nowrap">
          {cart.length > 0 ? (
            <>
              {cart.flat().map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-center items-center w-max border-r border-black h-full"
                >
                  <Image
                    width={300}
                    height={300}
                    objectFit="contain"
                    src={item.imageUrls[0]}
                    alt={item.title}
                  />
                  <div className="flex flex-col items-center justify-center gap-8 flex-1 w-full">
                    <h3 className="text-md text-center font-normal">
                      {item.title}
                    </h3>
                    <p className="text-base text-center font-normal">
                      {item.price} €
                    </p>
                  </div>
                  <button
                    onClick={() => removeItemFromCart(item.id)}
                    className="text-red-500 mb-2 cursor-pointer text-sm"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p>Votre panier est vide</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end px-2 gap-8 w-full border border-black bg-white sticky bottom-0">
          <div className="flex flex-col gap-4">
            <p>Frais de livraison: {deliveryCost},00 €</p>
            <span>Total: {totalAmount + deliveryCost},00 €</span>
          </div>
          <button
            onClick={checkout}
            className={`cursor-pointer bg-black px-4 py-3 text-white ${
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
                checkout(); // Continuer en tant qu'invité
              }}
              className="bg-gray-500 text-white rounded-xl px-4 py-2"
            >
              Continuer en tant qu&apos;invité
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
