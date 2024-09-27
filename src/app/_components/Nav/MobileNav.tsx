import { useGSAP } from "@gsap/react";
import gsap from "gsap";
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
      <div className="w-full flex justify-end p-10">
        <span
          onClick={() => handleClickMenu()}
          className="bg-black text-white py-2 px-3 rounded-full cursor-pointer"
        >
          Menu
        </span>
      </div>

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
            href="/about"
            label="About"
          />
          <TransitionLink
            setIsClicked={setIsClicked}
            href="/contact"
            label="Contact"
          />
        </div>
        <div className="absolute top-40 right-10 p-5">
          <FaShoppingCart size={20} />
        </div>
      </nav>
    </>
  );
}
