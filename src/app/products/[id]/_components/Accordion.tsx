import { gsap } from "gsap";
import { useEffect, useRef } from "react";

interface AccordionProps {
  isOpen: boolean; // Indique si l'accordéon est ouvert
  title: string;
  description: string;
  onClick: () => void; // Fonction appelée au clic
}

const Accordion = ({ isOpen, title, description, onClick }: AccordionProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Animation de l'ouverture et de la fermeture
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        gsap.to(contentRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  }, [isOpen]);

  return (
    <div className="border-b-[1px] border-black w-full">
      <div
        className="flex justify-between items-center py-2 px-2 cursor-pointer"
        onClick={onClick}
      >
        <h4>{title}</h4>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      <div
        ref={contentRef}
        style={{ height: 0, overflow: "hidden", opacity: 0 }}
      >
        <div className="py-2 px-2">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
