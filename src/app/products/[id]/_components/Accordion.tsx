import { Data } from "@/types/dataTypes";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef, useState } from "react";

interface AccordionProps {
  data: Data[];
}

const Accordion = ({ data }: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  useGSAP(() => {
    contentRefs.current.forEach((content, index) => {
      if (content) {
        if (activeIndex === index) {
          gsap.to(content, {
            height: "auto",
            duration: 0.5,
            opacity: 1,
            ease: "power2.Out",
          });
        } else {
          gsap.to(content, {
            height: 0,
            duration: 0.5,
            opacity: 0,
            ease: "power2.Out",
          });
        }
      }
    });
  }, [activeIndex]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? 0 : index);
  };

  const isStringOrNumber = data[0] && (data[0]?.waistline ?? "").length > 5;

  return (
    <div className="flex flex-col mt-10">
      {/* Section Longueur */}
      <div className="border-t-[1px] border-b-[1px] border-black w-full">
        <div
          className="flex justify-between items-center py-2 px-2 cursor-pointer"
          onClick={() => toggleAccordion(0)}
        >
          <h4>Longueur</h4>
          <span>{activeIndex === 0 ? "-" : "+"}</span>
        </div>
        <div
          ref={(el) => {
            contentRefs.current[0] = el;
          }}
          style={{ height: 0, overflow: "hidden", opacity: 0 }}
        >
          <div className="py-2 px-2">
            <p>Le pantalon mesure : {data[0]?.length} cm</p>
          </div>
        </div>
      </div>

      {/* Section Tour de taille */}
      <div className="border-b-[1px] border-black w-full">
        <div
          className="flex justify-between items-center py-2 px-2 cursor-pointer"
          onClick={() => toggleAccordion(1)}
        >
          <h4>Tour de taille</h4>
          <span>{activeIndex === 1 ? "-" : "+"}</span>
        </div>
        <div
          ref={(el) => {
            contentRefs.current[1] = el;
          }}
          style={{ height: 0, overflow: "hidden", opacity: 0 }}
        >
          <div className="py-2 px-2">
            <p>
              {data[0]?.waistline} {isStringOrNumber ? "" : "cm"}
            </p>
          </div>
        </div>
      </div>
      {/* Section Poids */}
      <div className="border-b-[1px] border-black w-full">
        <div
          className="flex justify-between items-center py-2 px-2 cursor-pointer"
          onClick={() => toggleAccordion(2)}
        >
          <h4>Poids</h4>
          <span>{activeIndex === 1 ? "-" : "+"}</span>
        </div>
        <div
          ref={(el) => {
            contentRefs.current[2] = el;
          }}
          style={{ height: 0, overflow: "hidden", opacity: 0 }}
        >
          <div className="py-2 px-2">
            <p>Le pantalon à un poids de {data[0]?.weight} g</p>
          </div>
        </div>
      </div>

      {/* Section Matériaux */}
      <div className="border-b-[1px] border-black w-full">
        <div
          className="flex justify-between items-center py-2 px-2 cursor-pointer"
          onClick={() => toggleAccordion(3)}
        >
          <h4>Matériaux</h4>
          <span>{activeIndex === 2 ? "-" : "+"}</span>
        </div>
        <div
          ref={(el) => {
            contentRefs.current[3] = el;
          }}
          style={{ height: 0, overflow: "hidden", opacity: 0 }}
        >
          <div className="py-2 px-2">
            <p>{data[0]?.material}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
