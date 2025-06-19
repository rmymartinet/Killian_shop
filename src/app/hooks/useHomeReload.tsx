import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useHomeReload = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isHomePage = pathname === "/";
      const isReload = window.performance.navigation.type === 1;
      const hasVisited = localStorage.getItem("hasVisitedHome");
      
      // Animer si :
      // 1. C'est la page Home ET
      // 2. (C'est la première visite OU c'est un rechargement de page)
      if (isHomePage && (!hasVisited || isReload)) {
        setShouldAnimate(true);
        localStorage.setItem("hasVisitedHome", "true");
      } else {
        setShouldAnimate(false);
      }
    }
  }, [pathname]);

  return shouldAnimate;
}; 