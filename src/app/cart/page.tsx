"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/choose-auth");
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Redirection...
        </h1>
        <p className="text-gray-600">
          Redirection vers la page de commande.
        </p>
      </div>
    </main>
  );
} 