import gsap from "gsap";

export const openAnimation = (
  shoppingContainerRef: React.RefObject<HTMLDivElement>,
  isShoppingOpen: boolean
) => {
  gsap.to(shoppingContainerRef.current, {
    x: isShoppingOpen ? "0%" : "200%",
    duration: 0.5,
    ease: "power3.out",
  });

  if (isShoppingOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};
