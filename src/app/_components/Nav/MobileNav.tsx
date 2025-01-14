import { setupMobileAnimation } from "@/utils/nav/setupMobileAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

export default function MobileNav() {
  const [isClicked, setIsClicked] = useState(false);
  const menuRef = useRef(null);

  const handleClickMenu = () => {
    setIsClicked(true);
  };
  const handleClickCloseMenu = () => {
    setIsClicked(false);
  };

  useEffect(() => {
    gsap.set(menuRef.current, { y: "100%" });
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
        className="flex flex-col gap-6 items-center w-screen h-max fixed inset-0 p-6 bg-black text-white z-50"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between w-full">
          <button onClick={handleClickCloseMenu} aria-label="Close menu">
            <IoCloseOutline size={25} />
          </button>
          <Link href="/checkout" onClick={handleClickCloseMenu}>
            <FaShoppingCart size={20} aria-label="Checkout" />
          </Link>
        </div>
        <div className="bg-black text-white gap-10 rounded-2xl text-3xl font-semibold shadow-xl flex">
          <Link onClick={handleClickCloseMenu} href="/">
            Home
          </Link>
          <Link onClick={handleClickCloseMenu} href="/shop">
            Shop
          </Link>
        </div>
      </nav>
    </>
  );
}
