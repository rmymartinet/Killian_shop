"use client";
import { TransitionLinkProps } from "@/types/dataTypes";
import { animatePageOut } from "@/utils/Animation";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const TransitionLink = ({
  href,
  label,
  setIsClicked,
  children,
}: TransitionLinkProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = () => {
    if (setIsClicked) {
      setIsClicked(false);
    }

    if (isTransitioning) return;

    if (pathname !== href) {
      setIsTransitioning(true);
      animatePageOut(href, router, () => {
        setIsTransitioning(false);
      });
    }
  };

  return (
    <button
      className="text-white hover:text-gray-300 w-full"
      onClick={handleClick}
      disabled={isTransitioning}
    >
      {label}
      {children}
    </button>
  );
};

export default TransitionLink;
