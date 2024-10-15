import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import TransitionLink from "../TransitionLinks";

export default function MobileNav() {
  const [isCLicked, setIsClicked] = useState(false);
  const menuRef = useRef(null);
  const handleClickMenu = () => {
    setIsClicked(true);
  };
  const handleClickCloseMenu = () => {
    setIsClicked(false);
  };

  useEffect(() => {
    gsap.set(menuRef.current, { x: "-100%" });
  }, []);

  useGSAP(() => {
    if (isCLicked) {
      document.body.style.overflow = "hidden";
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power4.out",
      });
    } else {
      document.body.style.overflow = "auto";
      gsap.to(menuRef.current, {
        x: "-100%",
        duration: 0.5,
        ease: "power4.out",
      });
    }
  }, [isCLicked]);
  return (
    <>
      <nav className="w-full flex items-center justify-between py-10">
        <div
          onClick={() => handleClickMenu()}
          className="text-white flex flex-col gap-2 cursor-pointer"
        >
          <div className="h-[2px] w-6 bg-black" />
          <div className="h-[2px] w-6 bg-black" />
        </div>
        <Link href="/checkout">
          <FaShoppingCart onClick={() => handleClickCloseMenu()} size={20} />
        </Link>
      </nav>

      <nav
        ref={menuRef}
        className="flex justify-center items-center h-screen fixed top-0 left-0 bg-black text-white w-full z-50"
      >
        <div
          onClick={() => handleClickCloseMenu()}
          className="absolute top-10 right-10"
        >
          <IoCloseOutline size={25} />
        </div>
        <div className="bg-black text-white grid grid-rows-4 place-items-start gap-10 rounded-2xl text-4xl  font-semibold shadow-xl">
          <TransitionLink
            setIsClicked={setIsClicked}
            href="/"
            label="Accueil"
          />
          <TransitionLink
            setIsClicked={setIsClicked}
            href="/shop"
            label="Shop"
          />
          <TransitionLink
            setIsClicked={setIsClicked}
            href="/marque"
            label="Marque"
          />
          <TransitionLink
            setIsClicked={setIsClicked}
            href="/contact"
            label="Contact"
          />
        </div>
        <Link
          href={"/checkout"}
          className="absolute top-40 flex w-full justify-between px-10"
        >
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <FaShoppingCart onClick={() => handleClickCloseMenu()} size={20} />
        </Link>
      </nav>
    </>
  );
}
