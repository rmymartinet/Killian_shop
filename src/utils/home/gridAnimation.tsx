import gsap from "gsap";

export const gridAnitmation = (
  shopButtonRef: React.RefObject<HTMLDivElement>,
  collectionRef: React.RefObject<HTMLDivElement>,
  gridContainerRef: React.RefObject<HTMLDivElement>
) => {
  const handleScroll = () => {
    const getBottomShopButton =
      shopButtonRef.current?.getBoundingClientRect().bottom ?? 0;

    const getTopCollectionRef =
      collectionRef.current?.getBoundingClientRect().top ?? 0;

    gsap.set(shopButtonRef.current, {
      zIndex: getTopCollectionRef > getBottomShopButton ? 10 : -10,
    });

    gsap.to(gridContainerRef.current, {
      opacity: getTopCollectionRef > getBottomShopButton ? 1 : 0,
      duration: 1,
      ease: "power2.out",
    });
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
};
