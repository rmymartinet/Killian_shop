import { UserButton, SignedIn, SignInButton, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import TransitionLink from "../TransitionLinks";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

export default function Nav() {
  const { user, isLoaded } = useUser();
  const { cart } = useCart();
  return (
    <nav className="flex justify-between fixed p-5 inset-0 items-center h-max z-50">
      <div className="flex gap-10 text-xl items-center">
        <TransitionLink href="/" label="Home" />
        <TransitionLink href="/shop" label="Shop" />
        <TransitionLink href="/contact" label="Contact" />
        {isLoaded && user?.publicMetadata.role === "admin" && (
          <Link href="/admin" className="font-semibold bg-green-500 text-white px-4 py-1 rounded-lg">
            + Ajouter un article
          </Link>
        )}
      </div>
      <div className="h-[10vh] fixed top-5 left-1/2 -translate-x-1/2">
        <Image
          alt=""
          src="/assets/logo_remove_bg.png"
          width={400}
          height={400}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex items-center gap-20 p-5 text-xl">
        <SignedOut>
          <SignInButton>
            Se connecter
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <TransitionLink href="/profile" label="Mon compte" />
          <UserButton />
        </SignedIn>
        <Link href="/choose-auth" className="relative">
          <FaShoppingCart size={20} />
          {cart.length > 0 && (
            <div className="absolute -bottom-2 bg-green-500 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </div>
          )}
        </Link>
      </div>
    </nav>
  );
}
