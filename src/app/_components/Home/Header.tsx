import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoIosArrowRoundForward } from "react-icons/io";

import { useFilteredData } from "@/app/hooks/useFilteredData";
import useWindow from "@/app/hooks/useWindow";
import { animateArrowOnHover } from "@/utils/common/animateArrowOnHover";
import { animateOnMouseMove } from "@/utils/common/animateOnMouseMove";
import { gridAnitmation } from "@/utils/home/gridAnimation";
import { setupAnimations } from "@/utils/home/setupAnimation";

import TransitionLink from "../TransitionLinks";
import FlexGrid from "../FlexGrid";
import Grid from "../Grid";
gsap.registerPlugin(useGSAP);

const Header = ({
  collectionRef,
}: {
  collectionRef: React.RefObject<HTMLDivElement>;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const shopButtonRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const { width } = useWindow();
  const { data } = useFilteredData();

  const handleOnMouseEnter = () => {
    setIsHovered(true);
  };

  const handleOnMouseLeave = () => {
    setIsHovered(false);
  };

  useGSAP(() => {
    setupAnimations(gridContainerRef, shopButtonRef, titleRef);
  }, []);

  useEffect(() => {
    if (gridContainerRef.current) {
      gridAnitmation(shopButtonRef, collectionRef, gridContainerRef);
    }
    animateOnMouseMove(gridContainerRef);
  }, []);
  useGSAP(() => {
    animateArrowOnHover(arrowRef, isHovered);
  }, [isHovered]);

  return (
    <div className="w-full flex flex-col relative h-screen items-center justify-center">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center -z-30">
        <h1
          ref={titleRef}
          className="text-[15vw] w-full grid place-content-center  -z-10"
        >
          © S.F.D.T.S
        </h1>
      </div>
      <div
        ref={shopButtonRef}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className="fixed top-[70%] left-1/2 -translate-x-1/2  -translate-y-1/2 w-full flex flex-col items-center overflow-hidden "
      >
        <TransitionLink
          href="/shop"
          className="px-4 py-2 bg-white flex items-center gap-4 rounded-xl cursor-pointer border-2 border-black z-10"
        >
          <h1 className="uppercase text-xl font-medium">
            Collection Disponible
          </h1>
          <div ref={arrowRef}>
            <IoIosArrowRoundForward className="text-3xl" />
          </div>
        </TransitionLink>
      </div>
      {width <= 498 ? (
        <FlexGrid data={data} gridRef={gridContainerRef} />
      ) : (
        <Grid data={data} gridRef={gridContainerRef} />
      )}
    </div>
  );
};

export default Header;
