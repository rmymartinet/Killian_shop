"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import "../app/globals.css";
import CartSideBar from "./_components/CardSideBar";
import Footer from "./_components/Footer";
import MobileNav from "./_components/Nav/MobileNav";
import Nav from "./_components/Nav/NavBar";
import { CartProvider } from "./context/CartContext";
import useWindow from "./hooks/useWindow";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";
import "lenis/dist/lenis.css";
import { anim } from "@/utils/pageTransition/pageTransition";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { width } = useWindow();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    lenis.on("scroll", () => {});
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ClerkProvider>
      <html lang="fr">
        <head>
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-P0V7F6LH7Q"
          ></Script>
          <Script id="google-analytic">
            {`
 window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-P0V7F6LH7Q');
    `}
          </Script>
        </head>
        <body className={`antialiased `}>
          <>
            <AnimatePresence mode="wait">
              {pathname !== "/success" &&
              pathname !== "/cancel" &&
              pathname !== "/not-found" ? (
                width <= 498 ? (
                  <MobileNav />
                ) : (
                  <Nav />
                )
              ) : null}
              <CartProvider>
                <motion.div key={pathname} {...anim()}>
                  {children} <CartSideBar />
                </motion.div>
              </CartProvider>
              {pathname !== "/contact" &&
                pathname !== "/checkout" &&
                pathname !== "/success" &&
                pathname !== "/cancel" &&
                pathname !== "/admin" &&
                pathname !== "/404" && <Footer />}
            </AnimatePresence>
          </>
        </body>
      </html>
    </ClerkProvider>
  );
}
