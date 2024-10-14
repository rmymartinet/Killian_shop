"use client";

import { useEffect, useState } from "react";
import "../app/globals.css";
import CartSideBar from "./_components/CardSideBar";
import Footer from "./_components/Footer";
import LoadingPage from "./_components/Loading";
import MobileNav from "./_components/Nav/MobileNav";
import Nav from "./_components/Nav/NavBar";
import { CartProvider } from "./context/CartContext";
import useWindow from "./hooks/useWindow";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimated, setIsAnimated] = useState(true);

  const { width } = useWindow();

  useEffect(() => {
    if (width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  return (
    <html lang="fr">
      <body className={`antialiased`}>
        {isAnimated ? (
          <LoadingPage setIsAnimated={setIsAnimated} />
        ) : (
          <>
            <div className="px-2">
              {isMobile ? <MobileNav /> : <Nav />}
              <CartProvider>
                {children}
                <CartSideBar />
              </CartProvider>
            </div>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
