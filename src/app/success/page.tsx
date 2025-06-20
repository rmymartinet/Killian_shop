"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { useCart } from "../context/CartContext";

interface PaymentVerificationResponse {
  success: boolean;
  message?: string;
  error?: string;
  customerEmail?: string;
  orderDetails?: {
    productIds: string[];
    quantities: number[];
  };
}

const PaymentSuccess = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [paymentVerified, setPaymentVerified] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const { setCart } = useCart();
  const router = useRouter();

  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000;

  // Validation du sessionId
  const isValidSessionId = (id: string | null): boolean => {
    return id !== null && id.startsWith('cs_') && id.length > 10;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    
    if (!isValidSessionId(sessionId)) {
      setError("Session ID invalide");
      setIsLoading(false);
      return;
    }
    
    setSessionId(sessionId);
  }, []);

  const verifyPayment = async (sessionId: string): Promise<PaymentVerificationResponse> => {
    const response = await fetch(`/api/verify-payment/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    return response.json();
  };

  useEffect(() => {
    if (!sessionId) return;

    const performVerification = async () => {
      try {
        setIsLoading(true);
        const data = await verifyPayment(sessionId);
        
        if (data.success) {
          setPaymentVerified(true);
          setOrderDetails(data.orderDetails);
          
          // Vider le panier proprement selon le système du CartContext
          setCart([]);
          
          // Nettoyer le stockage spécifique à l'utilisateur
          if (typeof window !== "undefined") {
            const userId = localStorage.getItem("userId");
            if (userId) {
              // Utilisateur connecté - nettoyer localStorage
              localStorage.removeItem(`cart_${userId}`);
            } else {
              // Utilisateur invité - nettoyer sessionStorage
              const sessionUserId = sessionStorage.getItem("sessionUserId");
              if (sessionUserId) {
                sessionStorage.removeItem(`cart_${sessionUserId}`);
              }
            }
          }
        } else {
          setPaymentVerified(false);
          setError(data.error || "Échec de la vérification du paiement");
        }
      } catch (error) {
        console.error("Erreur de vérification:", error);
        
        if (retryCount < MAX_RETRIES) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => {
            performVerification();
          }, RETRY_DELAY);
        } else {
          setPaymentVerified(false);
          setError("Impossible de vérifier le paiement après plusieurs tentatives");
        }
      } finally {
        setIsLoading(false);
      }
    };

    performVerification();
  }, [sessionId, retryCount, setCart]);

  // Redirection automatique après succès
  useEffect(() => {
    if (paymentVerified === true) {
      const timeoutId = setTimeout(() => {
        router.push("/");
      }, 10000); // 10 secondes

      return () => clearTimeout(timeoutId);
    }
  }, [paymentVerified, router]);

  // Redirection si pas de sessionId
  useEffect(() => {
    if (!sessionId && !isLoading) {
      router.push("/");
    }
  }, [sessionId, isLoading, router]);

  const handleManualRedirect = () => {
    router.push("/");
  };

  const handleRetry = () => {
    setRetryCount(0);
    setError(null);
    setPaymentVerified(null);
    setIsLoading(true);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Vérification en cours...
          </h1>
          <p className="text-gray-600 mb-4">
            Nous vérifions le statut de votre paiement. Veuillez patienter.
          </p>
          {retryCount > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <p className="text-sm text-orange-700">
                Tentative {retryCount}/{MAX_RETRIES}
              </p>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
        {paymentVerified === true && (
          <div className="text-center">
            {/* Animation de succès */}
            <div className="mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CiCircleCheck size={48} className="text-green-600" />
                </div>
                <div className="absolute inset-0 w-20 h-20 bg-green-100 rounded-full animate-ping opacity-20"></div>
              </div>
            </div>

            {/* Titre et message */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Paiement réussi !
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Votre commande a été confirmée et sera expédiée sous peu.
            </p>

            {/* Détails de la commande */}
            {orderDetails && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm font-medium text-gray-700">
                    Commande confirmée
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  {orderDetails.productIds.length} article(s) commandé(s)
                </p>
              </div>
            )}

            {/* Barre de progression */}
            <div className="mb-6">
              <div className="bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full animate-pulse"></div>
              </div>
              <p className="text-sm text-gray-500">
                Redirection automatique dans quelques secondes...
              </p>
            </div>

            {/* Boutons d'action */}
            <div className="space-y-3">
              <button
                onClick={handleManualRedirect}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <IoArrowBack className="inline mr-2" />
                Retour à l'accueil
              </button>
            </div>
          </div>
        )}

        {paymentVerified === false && (
          <div className="text-center">
            {/* Icône d'erreur */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CiCircleCheck size={48} className="text-red-600" />
              </div>
            </div>

            {/* Titre et message d'erreur */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Échec de la vérification
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {error || "Une erreur s'est produite lors de la vérification du paiement."}
            </p>

            {/* Message d'aide */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-blue-800">
                Ne vous inquiétez pas, aucun montant n'a été débité de votre compte.
              </p>
            </div>

            {/* Boutons d'action */}
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Réessayer
              </button>
              <button
                onClick={handleManualRedirect}
                className="w-full bg-gray-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <IoArrowBack className="inline mr-2" />
                Retour à l'accueil
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default PaymentSuccess;
