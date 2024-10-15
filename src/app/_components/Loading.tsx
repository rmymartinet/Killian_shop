import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import React from "react";
import useWindow from "../hooks/useWindow";

// Constantes pour les opacités selon le breakpoint
const OPACITIES_DESKTOP = Array.from({ length: 9 }, (_, i) =>
  Math.max(90 - i * 10, 5)
);
const OPACITIES_TABLET = Array.from({ length: 20 }, (_, i) =>
  Math.max(95 - i * 6, 5)
);
const OPACITIES_MOBILE = Array.from({ length: 30 }, (_, i) =>
  Math.max(95 - i * 3, 5)
);

const LoadingPage = ({
  setIsAnimated,
}: {
  setIsAnimated: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { width } = useWindow();

  // Fonction pour déterminer le nombre de <h1> et les opacités à afficher en fonction de la largeur de la fenêtre
  const getHeadingData = (width: number) => {
    if (width > 1024) {
      return {
        numberOfHeadings: OPACITIES_DESKTOP.length,
        opacities: OPACITIES_DESKTOP,
      };
    }
    if (width > 498 && width <= 1024) {
      return {
        numberOfHeadings: OPACITIES_TABLET.length,
        opacities: OPACITIES_TABLET,
      };
    }
    return {
      numberOfHeadings: OPACITIES_MOBILE.length,
      opacities: OPACITIES_MOBILE,
    };
  };

  // Obtenir le nombre de <h1> et les opacités appropriées
  const { numberOfHeadings, opacities } = getHeadingData(width);

  // Créer des références pour chaque <h1>
  const h1Refs = Array.from({ length: numberOfHeadings }).map(() =>
    React.createRef<HTMLHeadingElement>()
  );

  useGSAP(() => {
    h1Refs.forEach((ref, index) => {
      gsap.to(ref.current, {
        opacity: opacities[index] / 100,
        yPercent: 0,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          if (index === h1Refs.length - 1) {
            setIsAnimated(false);
          }
        },
      });
    });
  }, []);

  return (
    <div className="min-h-screen w-[100dvw]">
      {h1Refs.map((ref, index) => (
        <h1
          key={index}
          ref={ref}
          className="text-black text-8xl flex flex-col text-[8vw] uppercase font-medium z-50 opacity-0"
          style={{ lineHeight: "1" }}
        >
          sois fier de tes sapes
        </h1>
      ))}
    </div>
  );
};

export default LoadingPage;
