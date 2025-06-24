"use client";

import { useFilteredData } from "@/app/hooks/useFilteredData";
import useWindow from "@/app/hooks/useWindow";
import { Data } from "@/types/dataTypes";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createRef, useEffect, useState } from "react";
import { DESKTOP_BREAKPOINT } from "@/utils/responsive";
import { useRef } from "react";
import { useRevealBlockAnimation } from "@/utils/Animation";
import ProductCardsCarousel from "@/app/_components/ProductCardsCarousel";
import ProductSkeleton from "../../_components/ProductSkeleton";
import ProductLabels from "../../_components/ProductLabels";
import ProductCardDetails from "../../_components/ProductCardDetails";
import ThumbnailImagesList from "../../_components/ThumbnailImagesList";

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
  hasValidImageDetails?: boolean;
}

const ProductPage = ({ params }: ProductPageProps) => {
  const { id } = params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [refs, setRefs] = useState([]);
  const { width } = useWindow();
  const { data }: { data: Data[]; loading: boolean } = useFilteredData("pants");

  const productPageRef = useRef<HTMLDivElement>(null);
  useRevealBlockAnimation({ref: productPageRef, delay: 0.5});

  const filteredDataById = data.filter((item: Data) => item.id === id);
  
  // Vérifier s'il y a des images détaillées valides
  const hasValidImageDetails = filteredDataById.length > 0 && 
    filteredDataById[0]?.imageDetails && 
    Array.isArray(filteredDataById[0].imageDetails) && 
    filteredDataById[0].imageDetails.length > 0 &&
    filteredDataById[0].imageDetails.some((img: string) => img && img.trim() !== '');

  const imageDetailsLength = hasValidImageDetails 
    ? filteredDataById.map((item: Data) => item.imageDetails?.length || 0)
    : [0];

  useEffect(() => {
    // Réinitialiser l'index si pas d'images détaillées
    if (!hasValidImageDetails) {
      setCurrentImageIndex(0);
    }
    
    setRefs((refs) =>
      Array(imageDetailsLength.length)
        .fill(null)
        .map((_, i) => refs[i] || createRef())
    );
  }, [imageDetailsLength.length, hasValidImageDetails]);

  if (!filteredDataById.length) {
    return <ProductSkeleton />;
  }

  return (
    <>
      <div className="mt-[20vh] flex justify-center w-full md:px-10 min-h-[100vh]" ref={productPageRef}>
        {width > DESKTOP_BREAKPOINT && <ProductLabels />}
        <ProductCardDetails
          filteredDataById={filteredDataById}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          imageDetailsLength={imageDetailsLength}
          hasValidImageDetails={hasValidImageDetails}
        />
        {width > DESKTOP_BREAKPOINT && hasValidImageDetails && (
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
