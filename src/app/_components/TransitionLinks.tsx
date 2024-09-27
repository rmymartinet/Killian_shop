"use client";
import { animatePageOut } from "@/app/utils/Animation";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  href: string;
  label?: string;
  children?: React.ReactNode;
  setIsClicked?: boolean;
}

const TransitionLink = ({ href, label, setIsClicked, children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (setIsClicked) {
      setIsClicked(false);
    }
    if (pathname !== href) {
      animatePageOut(href, router);
    }
  };

  return (
    <button
      className="text-white hover:text-gray-300 uppercase"
      onClick={handleClick}
    >
      {label}
      {children}
    </button>
  );
};

export default TransitionLink;
