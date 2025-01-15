"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useFilteredData } from "../hooks/useFilteredData";
import { useRemoveFromCart } from "../hooks/useRemoveFromCart";
import { DELEVERYCOST } from "@/utils/constant";
import { usePayment } from "../hooks/usePayment";
import { Data } from "@/types/dataTypes";

export default function Checkout() {
  const { cart } = useCart();
  const { data } = useFilteredData();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const allProducts = cart.flat().map((item) => item.id);
  const removeItemFromCart = useRemoveFromCart();
  const isProductOutOfStock: Data | undefined = data
    .filter((item) => allProducts.includes(item.id))
    .find((item) => item.quantity === 1);

  useEffect(() => {
    const total = cart
      .flat()
      .reduce((acc, item) => acc + Number(item.price), 0);
    setTotalAmount(Number(total.toFixed(2)));
  }, [cart]);

  const { checkout } = usePayment(setLoading, isProductOutOfStock);

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
              <p>{DELEVERYCOST},00 €</p>
            </div>

            <div className="flex items-center justify-between">
              <p>Total:</p>
              <p>{totalAmount + DELEVERYCOST},00 €</p>
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
    </section>
  );
}
