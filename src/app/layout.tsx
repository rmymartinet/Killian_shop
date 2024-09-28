"use client";

import { useEffect, useState } from "react";
import MobileNav from "../app/_components/Nav/MobileNav";
import Nav from "../app/_components/Nav/NavBar";
import "../app/globals.css";
import { CartProvider } from "./context/CartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 498);
    };

    // Initial check
    handleResize();

    // Event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <html lang="fr">
      <body className={`antialiased`}>
        {isMobile ? <MobileNav /> : <Nav />}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
