import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import useWindow from "../hooks/useWindow";

const OPACITIES = {
  desktop: Array.from({ length: 9 }, (_, i) => Math.max(90 - i * 10, 5)),
  tablet: Array.from({ length: 20 }, (_, i) => Math.max(95 - i * 6, 5)),
  mobile: Array.from({ length: 30 }, (_, i) => Math.max(95 - i * 3, 5)),
};

const LoadingPage = ({
  setIsAnimated,
}: {
  setIsAnimated: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const h1Refs = useRef<(HTMLHeadingElement | null)[]>([]);
  const { width } = useWindow();

  // Détermination du nombre de <h1> et des opacités en fonction de la largeur de la fenêtre
  const { numberOfHeadings, opacities } =
    width > 1024
      ? {
          numberOfHeadings: OPACITIES.desktop.length,
          opacities: OPACITIES.desktop,
        }
      : width > 498
      ? {
          numberOfHeadings: OPACITIES.tablet.length,
          opacities: OPACITIES.tablet,
        }
      : {
          numberOfHeadings: OPACITIES.mobile.length,
          opacities: OPACITIES.mobile,
        };

  // Références pour chaque <h1>

  useEffect(() => {
    h1Refs.current.forEach((ref, index) => {
      gsap.set(ref, { yPercent: index % 2 === 0 ? -100 : 100 });
      gsap.to(ref, {
        opacity: opacities[index] / 100,
        yPercent: 0,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          if (index === numberOfHeadings - 1) {
            setIsAnimated(false);
          }
        },
      });
    });
  }, [opacities, numberOfHeadings, setIsAnimated]);

  return (
    <div className="min-h-screen w-[100dvw]">
      {Array.from({ length: numberOfHeadings }).map((_, index) => (
        <h1
          key={index}
          ref={(el) => {
            h1Refs.current[index] = el; // Affectation sans retour de valeur
          }}
          className="text-black text-8xl flex flex-col text-[8vw] uppercase font-medium z-50 opacity-1"
          style={{ lineHeight: "1" }}
        >
          sois fier de tes sapes
        </h1>
      ))}
    </div>
  );
};

export default LoadingPage;
