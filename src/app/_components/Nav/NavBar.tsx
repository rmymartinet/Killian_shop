import { UserButton, SignedIn, SignUpButton, SignInButton, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import TransitionLink from "../TransitionLinks";
import Image from "next/image";

export default function Nav() {
  const { user, isLoaded } = useUser();

  return (
    <nav className="flex justify-between fixed p-5 inset-0 items-center h-max z-50">
      <div className="flex gap-10 text-xl">
        <TransitionLink href="/" label="Home" />
        <TransitionLink href="/shop" label="Shop" />
        <TransitionLink href="/contact" label="Contact" />
        {isLoaded && user?.publicMetadata.role === "admin" && (
          <TransitionLink href="/admin" label="Admin" />
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
        <Link href="/checkout">
          <FaShoppingCart size={20} />
        </Link>
      </div>
    </nav>
  );
}
