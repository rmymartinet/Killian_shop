import gsap from "gsap";
import { useEffect, useRef } from "react";

const ScrollBanner = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null); // Spécifiez le type ici

  useEffect(() => {
    const element = scrollRef.current;
    const firstChild = element?.firstChild; // Cela devrait fonctionner maintenant

    if (element && firstChild) {
      const childWidth = (firstChild as HTMLElement).offsetWidth; // Utiliser le type approprié

      // Calculer combien d'éléments sont nécessaires pour couvrir l'écran et un peu plus
      const repeatCount = Math.ceil(window.innerWidth / childWidth) + 3;

      // Cloner les enfants pour créer un défilement infini
      for (let i = 0; i < repeatCount; i++) {
        element.appendChild(firstChild.cloneNode(true));
      }

      // Créer l'animation infinie
      gsap.to(element, {
        x: `-=${childWidth * repeatCount}`, // Défile toute la largeur des éléments
        duration: 40, // Durée pour un cycle complet
        repeat: -1, // Répète indéfiniment
        ease: "none", // Défilement linéaire
        modifiers: {
          x: (x) => (parseFloat(x) % (childWidth * repeatCount)) + "px", // Retourne au début sans interruption
        },
      });
    }
  }, []);

  return (
    <div className="w-full overflow-hidden bg-black">
      <div ref={scrollRef} className="text-white flex whitespace-nowrap">
        <h1 className="text-xl font-semibold uppercase mx-4">
          100% unique, 100% recyclé
        </h1>
      </div>
    </div>
  );
};

export default ScrollBanner;
