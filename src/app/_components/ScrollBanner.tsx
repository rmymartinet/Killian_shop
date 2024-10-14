import gsap from "gsap";
import { useEffect, useRef } from "react";

const ScrollBanner = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = scrollRef.current;
    const firstChild = element?.firstChild;

    if (element && firstChild) {
      const childWidth = (firstChild as HTMLElement).offsetWidth;

      // Calculer combien d'éléments sont nécessaires pour couvrir l'écran et un peu plus
      const repeatCount = Math.ceil(window.innerWidth / childWidth) + 3;

      // Cloner les enfants pour créer un défilement infini
      for (let i = 0; i < repeatCount; i++) {
        element.appendChild(firstChild.cloneNode(true));
      }

      // Créer l'animation infinie
      gsap.to(element, {
        x: `-=${childWidth * repeatCount}`,
        duration: 40,
        repeat: -1,
        ease: "none",
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
