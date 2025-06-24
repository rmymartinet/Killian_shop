"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Type pour Lenis
interface LenisInstance {
  scrollTo: (target: number, options?: { duration?: number }) => void;
  destroy: () => void;
}

// Extension de Window pour inclure Lenis
declare global {
  interface Window {
    lenis?: LenisInstance;
  }
}

const useScrollToTop = () => {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Vérifier si le pathname a vraiment changé
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      
      // Fonction de scroll to top
      const scrollToTop = () => {
        try {
          // Méthode 1: Scroll classique
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
          
          // Méthode 2: Scroll sur document.documentElement
          document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
          
          // Méthode 3: Scroll sur document.body
          document.body.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
          
          // Méthode 4: Si Lenis est disponible, l'utiliser
          if (typeof window !== 'undefined' && window.lenis) {
            window.lenis.scrollTo(0, { duration: 1 });
          }
        } catch (error) {
          console.log('Scroll to top error:', error);
          // Fallback: scroll instantané
          window.scrollTo(0, 0);
        }
      };

      // Essayer plusieurs fois avec des délais différents
      scrollToTop(); // Immédiat
      
      setTimeout(scrollToTop, 50); // Après 50ms
      setTimeout(scrollToTop, 100); // Après 100ms
      setTimeout(scrollToTop, 200); // Après 200ms
      setTimeout(scrollToTop, 500); // Après 500ms (au cas où la page met du temps à charger)
      
      // Écouter les changements de scroll pour s'assurer qu'on est bien en haut
      const checkScroll = () => {
        if (window.scrollY > 100) {
          scrollToTop();
        }
      };
      
      // Vérifier le scroll pendant 2 secondes
      const scrollCheckInterval = setInterval(checkScroll, 100);
      setTimeout(() => clearInterval(scrollCheckInterval), 2000);
    }
  }, [pathname]);
};

export default useScrollToTop; 