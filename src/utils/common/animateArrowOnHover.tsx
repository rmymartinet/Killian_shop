import gsap from "gsap";

export const animateArrowOnHover = (
  arrow: React.RefObject<HTMLDivElement>,
  isHovered: boolean
) => {
  gsap.timeline().to(arrow.current, {
    x: isHovered ? 10 : 0,
    duration: 0.5,
    ease: "power1.out",
  });
};
