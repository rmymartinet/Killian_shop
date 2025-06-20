"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import {  SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { IoArrowBack, IoPerson, IoPersonOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

const ChooseAuth = () => {
  const { cart } = useCart();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const total = cart
      .flat()
      .reduce((acc, item) => acc + Number(item.price), 0);
    setTotalAmount(Number(total.toFixed(2)));
  }, [cart]);

  // Redirection automatique si l'utilisateur est connecté
  useEffect(() => {
    if (isLoaded && user && cart.length > 0) {
      setIsRedirecting(true);
      // Petit délai pour montrer le message de redirection
      const timeoutId = setTimeout(() => {
        router.push("/checkout");
      }, 1500);

      return () => clearTimeout(timeoutId);
    }
  }, [isLoaded, user, cart, router]);

  // Redirection si le panier est vide
  useEffect(() => {
    if (cart.length === 0 && !isRedirecting) {
      router.push("/shop");
    }
  }, [cart, router, isRedirecting]);

  const handleContinueAsGuest = () => {
    router.push("/checkout");
  };


  const handleBackToShop = () => {
    router.push("/shop");
  };

  // Affichage pendant la redirection automatique
  if (isRedirecting) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto mb-6"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Redirection automatique...
          </h1>
          <p className="text-gray-600 mb-4">
            Vous êtes connecté, redirection vers le paiement.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-700">
              Connecté en tant que {user?.firstName || user?.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Redirection...
          </h1>
          <p className="text-gray-600">
            Votre panier est vide, redirection vers la boutique.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 mt-[20vh]">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Finaliser votre commande
          </h1>
          <p className="text-lg text-gray-600">
            Choisissez comment vous souhaitez procéder
          </p>
        </div>

        {/* Résumé du panier */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Résumé de votre commande
            </h2>
            <FaShoppingCart className="text-blue-600" size={20} />
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Articles ({cart.length})</span>
              <span>{totalAmount} €</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Frais de livraison</span>
              <span>5,00 €</span>
            </div>
            <div className="border-t border-gray-300 pt-2">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{totalAmount + 5} €</span>
              </div>
            </div>
          </div>
        </div>

        {/* Options d'authentification - seulement pour les utilisateurs non connectés */}
        <SignedOut>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Option 1: Se connecter */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 hover:border-blue-300 transition-all duration-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IoPerson size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Se connecter
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Accédez à votre compte pour un suivi de commande et des avantages exclusifs
                </p>
                <SignInButton mode="modal">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                    Se connecter
                  </button>
                </SignInButton>
              </div>
            </div>

            {/* Option 2: Continuer en tant qu'invité */}
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-all duration-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IoPersonOutline size={32} className="text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Continuer en tant qu&apos;invité
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Procédez directement au paiement sans créer de compte
                </p>
                <button
                  onClick={handleContinueAsGuest}
                  className="w-full bg-gradient-to-r from-gray-600 to-slate-600 text-white py-3 px-6 rounded-xl font-medium hover:from-gray-700 hover:to-slate-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Continuer
                </button>
              </div>
            </div>
          </div>
        </SignedOut>

        {/* Bouton retour */}
        <div className="text-center">
          <button
            onClick={handleBackToShop}
            className="flex items-center justify-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <IoArrowBack />
            Retour à la boutique
          </button>
        </div>
      </div>
    </main>
  );
};

export default ChooseAuth; 