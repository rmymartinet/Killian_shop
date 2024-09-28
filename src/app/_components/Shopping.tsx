"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const Shopping = () => {
  const { cart, isShoppingOpen, setIsShoppingOpen } = useCart();
  const shoppingContainerRef = useRef<HTMLDivElement>(null);
  console.log(cart);

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

  const deliveryCost = 20;
  const totalWithDelivery = totalWithoutDelivery + deliveryCost;
  const formattedTotalWithoutDelivery = totalWithoutDelivery.toFixed(2);
  const formattedTotalWithDelivery = totalWithDelivery.toFixed(2);

  useGSAP(() => {
    gsap.to(shoppingContainerRef.current, {
      x: isShoppingOpen ? "0%" : "200%",
      duration: 0.5,
      ease: "power3.out",
    });
  }, [isShoppingOpen]);

  const handleCloseClick = () => {
    setIsShoppingOpen(false);
    // if (locomotiveScroll) locomotiveScroll.start();
    // document.body.style.overflow = "auto";
  };

  // useEffect(() => {
  //   if (isShoppingOpen) {
  //     if (locomotiveScroll) {
  //       locomotiveScroll.stop(); // Stopper Locomotive Scroll lorsque le shopping cart s'ouvre
  //     }
  //     document.body.style.overflow = "hidden"; // Désactiver le scroll global de la page
  //   } else {
  //     if (locomotiveScroll) {
  //       locomotiveScroll.start(); // Reprendre Locomotive Scroll à la fermeture du shopping cart
  //     }
  //     document.body.style.overflow = "auto"; // Réactiver le scroll global de la page
  //   }
  // }, [isShoppingOpen, locomotiveScroll]);

  // const stopPropagation = (e) => {
  //   e.stopPropagation();
  // };

  // useEffect(() => {
  //   const handleWheel = (event) => {
  //     if (isShoppingOpen) {
  //       event.stopPropagation(); // Empêcher la propagation du scroll à Locomotive Scroll
  //     }
  //   };

  //   const shoppingContainer = document.querySelector(".shopping-container");
  //   if (shoppingContainer) {
  //     shoppingContainer.addEventListener("wheel", handleWheel);
  //   }

  //   return () => {
  //     if (shoppingContainer) {
  //       shoppingContainer.removeEventListener("wheel", handleWheel);
  //     }
  //   };
  // }, [isShoppingOpen]);

  return (
    <div
      ref={shoppingContainerRef}
      className="fixed top-0 right-0 w-[400px] h-screen bg-white z-50 flex flex-col shadow-lg pointer-events-auto"
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
              <p className="text-red-500 cursor-pointer text-sm">Supprimer</p>
            </div>
          ))
        ) : (
          <div className="p-5 pt-10 h-full">
            <p>Your cart is empty.</p>
          </div>
        )}
      </div>

      <div className="bg-white w-full p-5 sticky bottom-0 z-10 border-t border-gray-200">
        <div className="flex justify-between mb-2">
          <p>ORDER VALUE</p>
          <p>{formattedTotalWithoutDelivery} €</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>DELIVERY</p>
          <p>{deliveryCost.toFixed(2)} €</p>
        </div>
        <div className="flex justify-between font-bold mb-4">
          <p>Total order:</p>
          <p>{formattedTotalWithDelivery} €</p>
        </div>
        <Link href="/checkout">
          <button
            onClick={() => setIsShoppingOpen(true)}
            className="w-full py-2 text-sm uppercase border border-black bg-white hover:bg-black hover:text-white transition"
          >
            Basket
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Shopping;
