"use client";
import { TransitionLinkProps } from "@/types/dataTypes";
import Link from "next/link";
import { useEffect, useState } from "react";

const TransitionLink = ({
  href,
  label,
  children,
  className,
}: TransitionLinkProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  useEffect(() => {
    isClicked && window.scrollTo(0, 0);
  }, [isClicked]);

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {label}
      {children}
    </Link>
  );
};

export default TransitionLink;
