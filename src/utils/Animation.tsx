import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

gsap.registerPlugin(useGSAP);

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

export const animatePageOut = (
  href: string,
  router: AppRouterInstance,
  onComplete: () => void
) => {
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
        onComplete();
      },
    });
  }
};


export const useRevealBlockAnimation = ({ref, delay}: {ref: React.RefObject<HTMLDivElement>, delay?: number}) => {
  useGSAP(() => {
    gsap.fromTo(ref.current, {
      y: 100,
      opacity: 0,
      filter: "blur(70px)",

    }, {
      y: 0,
      filter: "blur(0px)",
      opacity: 1,
      duration: 2,
      delay: delay,
      ease: "power2.inOut",
      
    });
  });
}
