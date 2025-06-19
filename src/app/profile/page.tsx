"use client";

import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetch("/api/orders")
        .then(res => res.json())
        .then(data => setOrders(data.orders || []));
    }
  }, [user]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 p-8">
      <SignedIn>
        <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <UserButton />
            <div>
              <h1 className="text-2xl font-bold">Bienvenue {user?.firstName || user?.emailAddresses?.[0]?.emailAddress} !</h1>
              <p className="text-gray-500">Email : {user?.emailAddresses?.[0]?.emailAddress}</p>
              <p className="text-gray-500">Inscrit le : {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold mt-4">Mes achats</h2>
          {orders.length === 0 ? (
            <p>Vous n'avez pas encore passé de commande.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {orders.map((order) => (
                <li key={order.id} className="py-2 flex justify-between items-center">
                  <span>Commande #{order.id} - {order.date}</span>
                  <span>{order.total} €</span>
                  <span className="text-sm text-green-600">{order.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </SignedIn>
      <SignedOut>
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">Espace personnel</h1>
          <p>Vous devez être connecté pour accéder à votre profil.</p>
          <SignInButton>
            <button className="px-4 py-2 bg-black text-white rounded">Se connecter</button>
          </SignInButton>
        </div>
      </SignedOut>
    </main>
  );
}