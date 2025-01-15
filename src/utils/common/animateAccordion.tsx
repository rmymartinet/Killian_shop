import gsap from "gsap";

export const animateAccordion = (
  targetRef: React.RefObject<HTMLDivElement>,
  isOpen: boolean
) => {
  if (targetRef.current) {
    if (isOpen) {
      gsap.to(targetRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(targetRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }
};
