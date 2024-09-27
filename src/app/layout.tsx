"use client";

import MobileNav from "../app/_components/Nav/MobileNav";
import Nav from "../app/_components/Nav/NavBar";
import "../app/globals.css";
import { CartProvider } from "./context/CartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [showLandingPage, setShowLandingPage] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowLandingPage(false);
  //   }, 10000);

  //   return () => clearTimeout(timer);
  // }, []);

  // return (
  //   <html lang="fr">
  //     <body className={`antialiased`}>
  //       {showLandingPage ? (
  //         <LandingPage />
  //       ) : (
  //         <>
  //           <Navbar />
  //           {children}
  //         </>
  //       )}
  //     </body>
  //   </html>
  // );

  return (
    <html lang="fr">
      <body className={`antialiased`}>
        {window.innerWidth > 498 ? <Nav /> : <MobileNav />}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
