import gsap from "gsap";

export const gridAnitmation = (
  shopButtonRef: React.RefObject<HTMLDivElement>,
  collectionRef: React.RefObject<HTMLDivElement>,
  gridContainerRef: React.RefObject<HTMLDivElement>
) => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // La grille doit être visible dans la première moitié de l'écran
    const isInHomeZone = scrollY < windowHeight / 2;

    // Logs de débogage
    console.log("Scroll Debug:", {
      scrollY,
      windowHeight,
      threshold: windowHeight / 2,
      isInHomeZone
    });

    // Ajuster le z-index du bouton shop (logique simplifiée)
    gsap.set(shopButtonRef.current, {
      zIndex: isInHomeZone ? 10 : -10,
    });

    if (isInHomeZone) {
      // Afficher la grille
      console.log("Affichage de la grille");
      gsap.to(gridContainerRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          console.log("Animation d'affichage terminée");
        }
      });
    } else {
      // Masquer la grille
      console.log("Masquage de la grille");
      gsap.to(gridContainerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          console.log("Animation de masquage terminée");
        }
      });
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
};
