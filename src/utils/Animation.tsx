import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const TEXT_IDS = Array.from({ length: 10 }, (_, i) => `text-${i}`);

export const animatePageIn = () => {
  const sentence = document.getElementById("sentence");

  if (sentence) {
    const textElements = TEXT_IDS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean);

    if (textElements.length > 0) {
      const tl = gsap.timeline();

      tl.set(textElements, {
        yPercent: (i) => i * 100, // Position initiale des éléments
      });

      tl.set(sentence, {
        yPercent: 0,
      });

      // Animation de montée
      tl.to(sentence, {
        delay: 0.5,
        yPercent: 200,
        duration: 0.7,
        ease: "power3.inOut",
      });
    }
  }
};

export const animatePageOut = (
  href: string,
  router: AppRouterInstance,
  onComplete: () => void
) => {
  const sentence = document.getElementById("sentence");

  if (sentence) {
    const textElements = TEXT_IDS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean);

    if (textElements.length > 0) {
      const tl = gsap.timeline({
        onComplete: () => {
          // Exécuter la navigation vers la nouvelle page une fois l'animation terminée
          onComplete();
          router.push(href);
        },
      });

      // Positionner les éléments de texte pour l'animation de sortie
      tl.set(textElements, {
        yPercent: (i) => i * 100,
      });

      tl.set(sentence, {
        yPercent: -200,
      });

      // Animation de descente avant de changer de page
      tl.to(sentence, {
        yPercent: 0,
        duration: 0.7,
        ease: "power3.inOut",
      });
    }
  }
};
