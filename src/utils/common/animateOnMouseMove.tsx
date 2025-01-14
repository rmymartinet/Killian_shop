import gsap from "gsap";

export const animateOnMouseMove = (
  container: React.RefObject<HTMLDivElement>
) => {
  const handleMouseMove = (e: MouseEvent) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    const movementFactor = 0.05;

    gsap.to(container.current, {
      duration: 1,
      x: clientX * movementFactor,
      y: clientY * movementFactor,
      ease: "power1.out",
    });
  };

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
};
