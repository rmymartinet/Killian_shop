import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import TransitionLink from "../TransitionLinks";

export default function Nav() {
  return (
    <nav className="flex justify-start items-center pt-10 p-5 mb-40">
      <div className="bg-black text-white flex gap-10 p-5 rounded-2xl text-md font-semibold shadow-xl">
        <TransitionLink href="/" label="Accueil" />
        <TransitionLink href="/shop" label="Shop" />
        <TransitionLink href="/marque" label="Marque" />
        <TransitionLink href="/contact" label="Contact" />
      </div>
      <div className="absolute right-10 flex items-center gap-20 p-5">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Link href="/checkout">
          <FaShoppingCart size={20} />
        </Link>
      </div>
    </nav>
  );
}
