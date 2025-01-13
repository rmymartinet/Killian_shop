import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import TransitionLink from "../TransitionLinks";

export default function Nav() {
  const { user, isLoaded } = useUser();

  return (
    <nav className="flex fixed p-5 inset-0 items-center h-max z-50">
      <div className="bg-black text-white flex gap-10 p-5 rounded-2xl text-md font-semibold shadow-xl">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        {isLoaded && user?.publicMetadata.role === "admin" && (
          <TransitionLink href="/admin" label="Admin" />
        )}
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
