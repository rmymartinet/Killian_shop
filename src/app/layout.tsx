"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import "../app/globals.css";
import CartSideBar from "./_components/CardSideBar";
import Footer from "./_components/Footer";
import LoadingPage from "./_components/Loading";
import MobileNav from "./_components/Nav/MobileNav";
import Nav from "./_components/Nav/NavBar";
import { CartProvider } from "./context/CartContext";
import useWindow from "./hooks/useWindow";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimated, setIsAnimated] = useState(true);
  const { width } = useWindow();
  const pathname = usePathname();

  useEffect(() => {
    if (width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    lenis.on("scroll", () => {});
  }, []);
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [dark],
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
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
        <body className={`antialiased`}>
          <>
            {pathname !== "/success" &&
            pathname !== "/cancel" &&
            pathname !== "/not-found" ? (
              isMobile ? (
                <MobileNav />
              ) : (
                <Nav />
              )
            ) : null}
            <CartProvider>
              {children} <CartSideBar />
            </CartProvider>
            {pathname !== "/contact" &&
              pathname !== "/checkout" &&
              pathname !== "/success" &&
              pathname !== "/cancel" &&
              pathname !== "/admin" &&
              pathname !== "/404" && <Footer />}
          </>
        </body>
      </html>
    </ClerkProvider>
  );
}
