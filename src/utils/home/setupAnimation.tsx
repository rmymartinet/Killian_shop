import { gsap } from "gsap";

export const setupAnimations = (
  shopButtonRef: React.RefObject<HTMLDivElement>,
  titleRef: React.RefObject<HTMLDivElement>
) => {

  gsap.set(shopButtonRef.current, {
    opacity: 0,
    y: 100,
  });

  gsap.set(titleRef.current, {
    opacity: 0,
    y: 100,
  });

  gsap
    .timeline()
    .to(
      shopButtonRef.current,
      {
        delay: 2,
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.inOut",
      }
    )
    .to(
      titleRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.inOut",
      },
      "-=0.9"
    )
};
