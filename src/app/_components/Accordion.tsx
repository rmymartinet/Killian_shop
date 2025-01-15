import { AccordionProps } from "@/types/dataTypes";
import { animateAccordion } from "@/utils/common/animateAccordion";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const Accordion = ({ isOpen, title, description, onClick }: AccordionProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    animateAccordion(contentRef, isOpen);
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
      <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
        <div className="py-2 px-2">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
