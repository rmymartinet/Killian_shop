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
import Image from "next/image";

export default function Nav() {
  const { user, isLoaded } = useUser();

  console.log("User:", user);
  console.log("isLoaded:", isLoaded);

  return (
    <nav className="flex justify-between fixed p-5 inset-0 items-center h-max z-50">
      <div className="bg-black text-white flex gap-10 p-5 rounded-2xl text-md font-semibold shadow-xl">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
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
      {/* <div className="flex items-center gap-20 p-5">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Link href="/checkout">
          <FaShoppingCart size={20} />
        </Link>
      </div> */}
    </nav>
  );
}
