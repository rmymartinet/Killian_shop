"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import { useRemoveFromCart } from "../hooks/useRemoveFromCart";

const CartSideBar = () => {
  const { cart, isShoppingOpen, setIsShoppingOpen } = useCart();
  const removeItemFromCart = useRemoveFromCart();
  const shoppingContainerRef = useRef<HTMLDivElement>(null);
  const totalWithoutDelivery = cart.reduce((total, item) => {
    const itemPrice =
      parseFloat(
        String(item.price)
          .replace(",", ".")
          .replace(/[^\d.-]/g, "")
      ) || 0;

    const itemQuantity = Number(item.quantity) || 0;
    return total + itemPrice * itemQuantity;
  }, 0);

  const deliveryCost = 5;
  const totalWithDelivery = totalWithoutDelivery + deliveryCost;
  const formattedTotalWithoutDelivery = totalWithoutDelivery.toFixed(2);
  const formattedTotalWithDelivery = totalWithDelivery.toFixed(2);

  useGSAP(() => {
    gsap.set(shoppingContainerRef.current, {
      x: "200%",
    });
  }, []);

  useGSAP(() => {
    gsap.to(shoppingContainerRef.current, {
      x: isShoppingOpen ? "0%" : "200%",
      duration: 0.5,
      ease: "power3.out",
    });

    if (isShoppingOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isShoppingOpen]);

  const handleCloseClick = () => {
    setIsShoppingOpen(false);
  };

  return (
    <div
      ref={shoppingContainerRef}
      className="fixed top-0 right-0 w-screen lg:w-[400px] h-screen bg-white z-50 flex flex-col shadow-lg pointer-events-auto"
    >
      <div className="p-5 cursor-pointer">
        <IoClose onClick={handleCloseClick} size={20} />
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {cart.length > 0 ? (
          cart.flat().map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 place-items-center border-b border-gray-200 pb-5 mb-5 mt-20"
            >
              <Image
                className="mr-5"
                width={10}
                height={10}
                layout="responsive"
                objectFit="contain"
                src={item.imageUrls[0]}
                alt={item.title}
              />
              <div className="flex-1">
                <h3 className="text-sm mb-1">{item.title}</h3>
                <p className="text-sm font-bold mb-1">{item.price} €</p>
                <p className="text-sm">Quantité: 1</p>
              </div>
              <button
                onClick={() => removeItemFromCart(item.id)}
                className="text-red-500 cursor-pointer text-sm"
              >
                Supprimer
              </button>
            </div>
          ))
        ) : (
          <div className="p-5 pt-10 h-full">
            <p>Votre panier est vide</p>
          </div>
        )}
      </div>
      <div className="bg-white w-full p-5 sticky bottom-0 z-10 border-t border-gray-200">
        <div className="flex justify-between mb-2">
          <p>VALEUR DE LA COMMANDE</p>
          <p>{formattedTotalWithoutDelivery} €</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>LIVRAISON</p>
          <p>{deliveryCost.toFixed(2)} €</p>
        </div>
        <div className="flex justify-between font-bold mb-4">
          <p>Total de la commande:</p>
          <p>{formattedTotalWithDelivery} €</p>
        </div>
        <Link href="/checkout">
          <button
            onClick={() => setIsShoppingOpen(false)}
            className="w-full py-2 text-sm uppercase border border-black bg-white hover:bg-black hover:text-white transition"
          >
            Panier
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartSideBar;
