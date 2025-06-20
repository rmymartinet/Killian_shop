"use client";
import { TransitionLinkProps } from "@/types/dataTypes";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TransitionLink = ({
  href,
  label,
  children,
  className,
}: TransitionLinkProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Déclencher la navigation avec transition
    router.push(href);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {label}
      {children}
    </Link>
  );
};

export default TransitionLink;
