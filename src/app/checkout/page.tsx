"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useRemoveFromCart } from "../hooks/useRemoveFromCart";

export default function Checkout() {
  const { cart } = useCart();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const removeItemFromCart = useRemoveFromCart();

  const deliveryCost = 8;

  // Calculer le montant total basé sur le panier
  useEffect(() => {
    const total = cart
      .flat()
      .reduce((acc, item) => acc + Number(item.price), 0);
    setTotalAmount(Number(Number(total).toFixed(2)));
  }, [cart]);

  const totalCost = totalAmount + deliveryCost;

  async function checkout() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    setLoading(true);

    try {
      // Vérifiez si l'utilisateur existe dans votre base de données

      const response = await fetch(`/api/checkout_sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: cart.flat() }),
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
          {cart.flat().map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-center items-center w-max border-r border-black h-full"
            >
              {/* Affichage de la première image du tableau imageUrls */}
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
        </div>
        <div className="flex items-center justify-end px-2 gap-8 w-full border border-black bg-white sticky bottom-0">
          <div className="flex flex-col gap-4">
            <p>Frais de livraison: €{deliveryCost},00</p>
            <span>Total: {totalAmount + deliveryCost},00 €</span>
          </div>
          <button
            onClick={checkout}
            className="cursor-pointer bg-black px-4 py-3 text-white"
            disabled={loading}
          >
            {loading ? "Chargement..." : "Payer"}
          </button>
        </div>
      </div>
    </section>
  );
}
