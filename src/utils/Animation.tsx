import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageIn = () => {
  const sentence = document.getElementById("sentence");

  if (sentence) {
    gsap.set(sentence, {
      yPercent: 0,
    });

    gsap.to(sentence, {
      delay: 0.5,
      yPercent: 200,
      duration: 0.7,
      ease: "power3.inOut",
    });
  }
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const sentence = document.getElementById("sentence");

  if (sentence) {
    gsap.set(sentence, {
      yPercent: -200,
    });

    // Animation de descente avant de changer de page
    gsap.to(sentence, {
      yPercent: 0,
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => {
        router.push(href);
      },
    });
  }
};
