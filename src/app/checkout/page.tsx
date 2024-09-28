"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart } = useCart();
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const deliveryCost = 8;

  // Calculer le montant total basé sur le panier
  useEffect(() => {
    const total = cart
      .flat()
      .reduce((acc, item) => acc + Number(item.price), 0);
    setTotalAmount(Number(Number(total).toFixed(2)));
  }, [cart]);

  const totalCost = totalAmount + deliveryCost;
  const handleProcedToPayment = async () => {
    try {
      const response = await fetch("api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalCost,
          products: cart.flat().map((item) => ({
            name: item.title,
            id: item.id,
            price: item.price,
          })),
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirection vers Stripe Checkout
      }
    } catch (error) {
      console.error("Erreur lors de la procédure de paiement", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[100dvh] overflow-hidden">
      <div className="flex border border-black w-full h-[90%] mt-[20dvh] overflow-x-auto whitespace-nowrap">
        {cart.flat().map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-center items-center border-b border-gray-300 mb-5 border-solid black w-max h-full"
          >
            {/* Affichage de la première image du tableau imageUrls */}
            <Image
              width={500}
              height={500}
              layout="responsive"
              objectFit="contain"
              src={item.imageUrls[0]} // Utilisation de la première image du tableau
              alt={item.title}
              className="w-[500px] h-[500px] object-contain p-5"
            />
            <div className="flex flex-col items-center justify-center gap-8 flex-1 w-full">
              <h3 className="text-md text-center font-normal">{item.title}</h3>
              <p className="text-base text-center font-normal">
                {item.price} €
              </p>
            </div>
            <button
              className="cursor-pointer p-2 underline"
              onClick={() => /* Handle delete */ {}}
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-8 w-full border border-black bg-white sticky bottom-0">
        <div className="flex flex-col gap-4">
          <p>Frais de livraison: €{deliveryCost},00</p>
          <span>Total: {totalAmount + deliveryCost},00 €</span>
        </div>
        <button
          onClick={handleProcedToPayment}
          className="bg-black text-white py-3 px-4 cursor-pointer"
        >
          Payer
        </button>
      </div>
    </div>
  );
}
