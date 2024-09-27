import { FaShoppingCart } from "react-icons/fa";
import TransitionLink from "../TransitionLinks";

export default function Nav() {
  return (
    <nav className="flex justify-start items-center pt-10 p-5">
      <div className="bg-black text-white flex gap-10 p-5 rounded-2xl text-md font-semibold shadow-xl">
        <TransitionLink href="/" label="Accueil" />
        <TransitionLink href="/shop" label="Shop" />
        <TransitionLink href="/about" label="About" />
        <TransitionLink href="/contact" label="Contact" />
      </div>
      <div className="absolute right-10 p-5">
        <FaShoppingCart size={20} />
      </div>
    </nav>
  );
}
