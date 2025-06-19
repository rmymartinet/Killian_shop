"use client";

import { useFilteredData } from "@/app/hooks/useFilteredData";
import useWindow from "@/app/hooks/useWindow";
import { Data } from "@/types/dataTypes";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createRef, useEffect, useState } from "react";
import ProductLabels from "./_components/ProductLabels";
import ThumbnailImagesList from "./_components/ThumbnailImagesList";
import { DESKTOP_BREAKPOINT } from "@/utils/responsive";
import ProductCardDetails from "./_components/ProductCardDetails";
import ProductCard from "@/app/_components/ProductCard";

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


  console.log("DAAATA",data); 


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
      <div className="mt-[20vh] flex justify-center w-full md:px-10 min-h-[100vh]">
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
        <div className="w-full h-full flex flex-col md:flex-row md:justify-center gap-4 lg:gap-40">
          {data
            .filter((item: Data) => item.id !== id)
            .map((item: Data) => (
              <ProductCard
                key={item.id}
                id={item.id}
                imageUrls={[item.imageUrls]}
                imageDetails={item.imageDetails ? [item.imageDetails] : undefined}
                title={item.title}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
