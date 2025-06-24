"use client";

import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaUser, FaEnvelope, FaMapMarkerAlt, FaCalendar } from "react-icons/fa";
import Link from "next/link";
import ProfileSkeleton from "./_components/ProfileSkeleton";

interface Order {
  id: string;
  originalId: string;
  quantity: number;
  totalPrice: number;
  email: string;
  addressLine1: string;
  addressLine2: string;
  addressCity: string;
  addressState: string;
  addressPostalCode: string;
  addressCountry: string;
  createdAt: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  imageFace?: string;
}

export default function ProfilePage() {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      
      const fetchData = async () => {
        try {
          setLoading(true);
          
          const [ordersResponse, productsResponse] = await Promise.all([
            fetch('/api/orders'),
            fetch('/api/products')
          ]);

      

          if (ordersResponse.ok && productsResponse.ok) {
            const ordersData = await ordersResponse.json();
            const productsData = await productsResponse.json();
         
            
            setOrders(ordersData.orders || []);
            setProducts(productsData.products || []);
          } else {
            if (!ordersResponse.ok) {
              const errorData = await ordersResponse.json();
              console.error("Erreur API orders:", errorData);
            }
            if (!productsResponse.ok) {
              const errorData = await productsResponse.json();
              console.error("Erreur API products:", errorData);
            }
          }
        } catch (error) {
          console.error('Erreur lors du chargement des données:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      console.error("Utilisateur non connecté");
    }
  }, [user]);

  const getProductTitle = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product?.title || 'Produit inconnu';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center gap-10 p-8 mt-[20vh]">
      <SignedIn>
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
            {/* Header du profil - toujours visible */}
            <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-200">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <FaUser size={32} className="text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Bienvenue {user?.firstName || user?.emailAddresses?.[0]?.emailAddress} !
                </h1>
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <FaEnvelope size={16} />
                  <span>{user?.emailAddresses?.[0]?.emailAddress}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <FaCalendar size={16} />
                  <span>Inscrit le {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : "-"}</span>
                </div>
              </div>
              <div className="ml-auto">
                <UserButton />
              </div>
            </div>

            {/* Section des commandes avec scroll */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FaShoppingCart className="text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">
                  Mes commandes
                </h2>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <FaShoppingCart className="text-gray-400 mx-auto mb-4" size={48} />
                  <p className="text-gray-600 text-lg mb-4">
                    Vous n&apos;avez pas encore passé de commande.
                  </p>
                  <Link
                    href="/shop" 
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Découvrir nos produits
                  </Link>
                </div>
              ) : (
                <div 
                  className="border border-gray-200 rounded-lg p-4"
                  style={{
                    height: '400px',
                    overflowY: 'auto',
                    overflowX: 'hidden'
                  }}
                >
                  <div className="space-y-6 pr-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Informations de la commande */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-gray-800">
                                Commande #{order.id.slice(-8)}
                              </h3>
                              <span className="text-sm text-gray-500">
                                {formatDate(order.createdAt)}
                              </span>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <FaShoppingCart className="text-blue-600" size={16} />
                                <span className="font-medium">
                                  {getProductTitle(order.originalId)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-600">Quantité:</span>
                                <span className="font-medium">{order.quantity}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-600">Prix total:</span>
                                <span className="font-bold text-green-600">
                                  {order.totalPrice} €
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Adresse de livraison */}
                          <div className="space-y-4">
                            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                              <FaMapMarkerAlt className="text-blue-600" size={16} />
                              Adresse de livraison
                            </h4>
                            
                            <div className="text-sm text-gray-600 space-y-1">
                              <div>{order.addressLine1}</div>
                              {order.addressLine2 && <div>{order.addressLine2}</div>}
                              <div>
                                {order.addressPostalCode} {order.addressCity}
                              </div>
                              <div>{order.addressCountry}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </SignedIn>
      
      <SignedOut>
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6 max-w-md w-full">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <FaUser size={32} className="text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Espace personnel</h1>
          <p className="text-gray-600 text-center">
            Vous devez être connecté pour accéder à votre profil et voir vos commandes.
          </p>
          <SignInButton>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Se connecter
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </main>
  );
}