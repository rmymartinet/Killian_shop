import { setupMobileAnimation } from "@/utils/nav/setupMobileAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { useCart } from "@/app/context/CartContext";

export default function MobileNav() {
  const [isClicked, setIsClicked] = useState(false);
  const lineTopRef = useRef(null);
  const lineBottomRef = useRef(null);
  const menuRef = useRef(null);
  const iconBucketRef = useRef(null);
  const { user, isLoaded } = useUser();
  const { cart } = useCart();
  const handleClickMenu = () => {
    setIsClicked(!isClicked);
  };
  const handleClickCloseMenu = () => {
    setIsClicked(false);
  };

  useGSAP(() => {
    gsap.to(lineTopRef.current, {
      rotate: isClicked ? 45 : 0,
      transformOrigin: "center",
      y: isClicked ? 0 : 2,
      backgroundColor: isClicked ? "white" : "black",
      duration: 0.3,
    });

    gsap.to(lineBottomRef.current, {
      rotate: isClicked ? -45 : 0,
      transformOrigin: "center",
      y: isClicked ? -10 : 0,
      backgroundColor: isClicked ? "white" : "black",
      duration: 0.3,
    });
  }, [isClicked]);

  useEffect(() => {
    gsap.set(menuRef.current, { y: "-100%" });
  }, []);

  useEffect(() => {
    if (isClicked) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isClicked]);

  useGSAP(() => {
    setupMobileAnimation(isClicked, menuRef);
  }, [isClicked]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full flex items-center justify-between py-10 px-4 z-50">
        <button
          onClick={handleClickMenu}
          className="text-white flex flex-col gap-2 cursor-pointer"
          aria-label="Open menu"
        >
          <div ref={lineTopRef} className="h-[2px] w-6 bg-white" />
          <div ref={lineBottomRef} className="h-[2px] w-6 bg-white" />
        </button>
        <Link
          ref={iconBucketRef}
          href="/choose-auth"
          onClick={handleClickCloseMenu}
          className="relative"
        >
          <FaShoppingCart
            size={20}
            aria-label="Checkout"
            className={`relative ${
              isClicked ? "text-white duration-300" : "text-black duration-300"
            }`}
          />
           {cart.length > 0 && (
            <div className="absolute -bottom-2 bg-green-500 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </div>
          )}
        </Link>
      </header>
      <nav
        ref={menuRef}
        className="flex flex-col -translate-y-[100%] gap-6 items-center w-screen h-[100dvh] fixed inset-0 p-6 bg-black text-white z-40 pt-40"
        aria-hidden="true"
      >
        <div className="bg-black text-white gap-10 rounded-2xl text-3xl font-semibold shadow-xl flex flex-col items-start">
          <Link onClick={handleClickCloseMenu} href="/">
            Home
          </Link>
          <Link onClick={handleClickCloseMenu} href="/shop">
            Shop
          </Link>
          <Link onClick={handleClickCloseMenu} href="/contact">
            Contact
          </Link>
          {isLoaded && user?.publicMetadata.role === "admin" && (
            <Link onClick={handleClickCloseMenu} href="/admin">
              Admin
            </Link>
          )}
          <SignedIn>
            <Link onClick={handleClickCloseMenu} href="/profile">
              Mon compte
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <span className="text-white text-2xl">Se connecter</span>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </>
  );
}
