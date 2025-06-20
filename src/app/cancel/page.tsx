"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const PaymentCancel = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { cart } = useCart();

  // Récupération du session_id dans l'URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    setSessionId(sessionId);
    setIsLoading(false);
  }, []);

  // Redirection automatique après 10 secondes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push("/");
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [router]);

  // Redirection si pas de sessionId
  useEffect(() => {
    if (!sessionId && !isLoading) {
      router.push("/");
    }
  }, [sessionId, isLoading, router]);

  const handleManualRedirect = () => {
    router.push("/");
  };

  const handleRetryPayment = () => {
    // Rediriger vers la page choose-auth pour permettre une nouvelle tentative
    router.push("/choose-auth");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-600 mx-auto mb-6"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Chargement...
          </h1>
          <p className="text-gray-600">
            Veuillez patienter.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
        <div className="text-center">
          {/* Icône d'annulation */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BiErrorCircle size={48} className="text-orange-600" />
            </div>
          </div>

          {/* Titre et message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Paiement annulé
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Votre paiement a été annulé. Aucun montant n'a été débité de votre compte.
          </p>

          {/* Information sur le panier */}
          {cart && cart.length > 0 && (
            <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm font-medium text-blue-700">
                  Panier conservé
                </p>
              </div>
              <p className="text-sm text-blue-600">
                Votre panier contient encore {cart.length} article(s). 
                Vous pouvez réessayer votre paiement.
              </p>
            </div>
          )}

          {/* Message rassurant */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm font-medium text-green-700">
                Aucun débit effectué
              </p>
            </div>
            <p className="text-sm text-green-600">
              Votre compte bancaire n'a pas été débité. Vous pouvez réessayer en toute sécurité.
            </p>
          </div>

          {/* Barre de progression */}
          <div className="mb-6">
            <div className="bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full animate-pulse"></div>
            </div>
            <p className="text-sm text-gray-500">
              Redirection automatique dans quelques secondes...
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-3">
            {cart && cart.length > 0 && (
              <button
                onClick={handleRetryPayment}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Réessayer le paiement
              </button>
            )}
            
            <button
              onClick={handleManualRedirect}
              className="w-full bg-gray-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <IoArrowBack className="inline mr-2" />
              Retour à l'accueil
            </button>
          </div>

          {/* Message de support */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Si vous avez des questions concernant votre commande, 
              n'hésitez pas à nous contacter.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentCancel;
