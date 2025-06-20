"use client";

import { useFilteredData } from "@/app/hooks/useFilteredData";
import useWindow from "@/app/hooks/useWindow";
import { Data } from "@/types/dataTypes";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createRef, useEffect, useState } from "react";
import ProductLabels from "./_components/ProductLabels";
import { DESKTOP_BREAKPOINT } from "@/utils/responsive";
import ProductCardDetails from "./_components/ProductCardDetails";
import { useRef } from "react";
import { revealBlockAnimation } from "@/utils/Animation";
import ProductCarousel from "./_components/ProductCarousel";
import ProductCard from "@/app/_components/ProductCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ThumbnailImagesList from "./_components/ThumbnailImagesList";
import ProductCardsCarousel from "@/app/_components/ProductCardsCarousel";

gsap.registerPlugin(ScrollTrigger);

interface ProductPageProps {
  params: {
    id: string;
  };
}

export interface ProductCardProps {
  id: string;
  imageUrls: string[];
  imageDetails?: string[];
  title: string;
  price?: number;
  quantity?: number;
}

const ProductPage = ({ params }: ProductPageProps) => {
  const { id } = params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [refs, setRefs] = useState([]);
  const { width } = useWindow();
  const { data }: { data: Data[]; loading: boolean } = useFilteredData("pants");


  const productPageRef = useRef<HTMLDivElement>(null);
  revealBlockAnimation({ref: productPageRef, delay: 0.5});

  const filteredDataById = data.filter((item: Data) => item.id === id);
  const imageDetailsLength = filteredDataById.map(
    (item: Data) => item.imageDetails?.length || 0
  );

  useEffect(() => {
    setRefs((refs) =>
      Array(imageDetailsLength.length)
        .fill(null)
        .map((_, i) => refs[i] || createRef())
    );
  }, [imageDetailsLength.length]);

  return (
    <>
      <div className="mt-[20vh] flex justify-center w-full md:px-10 min-h-[100vh]" ref={productPageRef}>
        {width > DESKTOP_BREAKPOINT && <ProductLabels />}
        <ProductCardDetails
          filteredDataById={filteredDataById}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          imageDetailsLength={imageDetailsLength}
        />
        {width > DESKTOP_BREAKPOINT && filteredDataById.length > 0 && (
          <ThumbnailImagesList
            data={filteredDataById}
            refs={refs}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
        )}
      </div>
      <div className="mt-20 min-w-screen  flex md:justify-center items-center">
      <ProductCardsCarousel
  products={data
    .filter((item: Data) => item.id !== id)
    .map((item: Data, index: number) => ({
      ...item,
      index,
    }))}
 />
      </div>
    </>
  );
};

export default ProductPage;
