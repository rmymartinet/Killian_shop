import gsap from "gsap";

export const setupMobileAnimation = (
  isCLicked: boolean,
  menuRef: React.RefObject<HTMLDivElement>
) => {
  isCLicked
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  gsap.to(menuRef.current, {
    x: isCLicked ? 0 : "-100%",
    duration: 0.5,
    ease: "power4.out",
  });
};
