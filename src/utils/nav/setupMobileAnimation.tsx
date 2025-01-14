import gsap from "gsap";

export const setupMobileAnimation = (
  isClicked: boolean,
  menuRef: React.RefObject<HTMLDivElement>
) => {
  isClicked
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  gsap.to(menuRef.current, {
    y: isClicked ? 0 : "-100%",
    duration: 0.5,
    ease: "power4.out",
  });
};
