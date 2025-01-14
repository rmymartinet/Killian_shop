import { setupMobileAnimation } from "@/utils/nav/setupMobileAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

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
    setupMobileAnimation(isCLicked, menuRef);
  }, [isCLicked]);

  return (
    <>
      <header className="w-full flex items-center justify-between py-10 px-2">
        <button
          onClick={handleClickMenu}
          className="text-white flex flex-col gap-2 cursor-pointer"
          aria-label="Open menu"
        >
          <div className="h-[2px] w-6 bg-black" />
          <div className="h-[2px] w-6 bg-black" />
        </button>
        <Link href="/checkout" onClick={handleClickCloseMenu}>
          <FaShoppingCart size={20} aria-label="Checkout" />
        </Link>
      </header>

      <nav
        ref={menuRef}
        className="flex justify-center items-center h-screen fixed top-0 left-0 bg-black text-white w-full z-50"
        aria-hidden="true"
      >
        <button
          onClick={handleClickCloseMenu}
          className="absolute top-10 right-10"
          aria-label="Close menu"
        >
          <IoCloseOutline size={25} />
        </button>
        <div className="bg-black text-white grid grid-rows-4 place-items-start gap-10 rounded-2xl text-4xl font-semibold shadow-xl">
          <Link onClick={handleClickCloseMenu} href="/">
            Home
          </Link>
          <Link onClick={handleClickCloseMenu} href="/shop">
            Shop
          </Link>
        </div>
        <Link
          href="/checkout"
          className="absolute top-40 flex w-full justify-between px-10"
          onClick={handleClickCloseMenu}
        >
          <FaShoppingCart size={20} aria-label="Checkout" />
        </Link>
      </nav>
    </>
  );
}
