import { gsap } from "gsap";

export const setupAnimations = (
  gridContainerRef: React.RefObject<HTMLDivElement>,
  shopButtonRef: React.RefObject<HTMLDivElement>,
  titleRef: React.RefObject<HTMLDivElement>
) => {
  gsap.set(gridContainerRef.current, {
    x: 0,
    y: 0,
    opacity: 0,
  });

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
      ".circle-mask",
      {
        delay: 0.5,
        clipPath: "circle(0% at 100% 100%)",
        duration: 1,
        ease: "power3.inOut",
      },
      "-=0.5"
    )
    .to(
      shopButtonRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.inOut",
      },
      "-=1"
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
    .to(
      gridContainerRef.current,
      {
        opacity: 1,
        duration: 1,
        ease: "power1.out",
      },
      "-=1"
    );
};
