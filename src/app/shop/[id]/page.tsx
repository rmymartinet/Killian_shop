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
import SimpleProductView from "../../_components/SimpleProductView";
import ThumbnailImagesList from "../../_components/ThumbnailImagesList";
import SideBySideImages from "@/app/_components/SideBySideImages";

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
  const { data, loading }: { data: Data[]; loading: boolean } = useFilteredData();

  const productPageRef = useRef<HTMLDivElement>(null);
  useRevealBlockAnimation({ref: productPageRef, delay: 0.5});

  const filteredDataById = data.filter((item: Data) => item.id === id);
  const product = filteredDataById[0];

  // Récupère toutes les images valides (face, ensemble, détails) et retire les doublons
  const allImages = [
    ...(product?.imageFace ? [product.imageFace] : []),
    ...(product?.imageEnsemble ? [product.imageEnsemble] : []),
    ...(Array.isArray(product?.imageDetails) ? product.imageDetails.filter(img => img && img.trim() !== "") : [])
  ].filter((img, idx, arr) => img && arr.indexOf(img) === idx);

  // Pour le carousel/thumbnails
  const imageDetailsLength = allImages.length > 2 ? [allImages.length] : [0];
  console.log(imageDetailsLength);

  useEffect(() => {
    if (allImages.length > 2) {
      setRefs((refs) =>
        Array(imageDetailsLength.length)
          .fill(null)
          .map((_, i) => refs[i] || createRef())
      );
    }
  }, [allImages.length]);

  // Gestion du chargement et des erreurs
  if (loading) return <ProductSkeleton />;
  if (!product || allImages.length === 0) return <ProductSkeleton />;

  // Cas 1 : 1 seule image
  if (allImages.length === 1) {
    return (
      <div className="mt-[20vh] flex justify-center w-full md:px-10 min-h-[100vh]" ref={productPageRef}>
        <SimpleProductView filteredDataById={filteredDataById} />
      </div>
    );
  }

  // Cas 2 : 2 images (peu importe lesquelles)
  if (allImages.length === 2) {
    return (
      <div className="mt-[20vh] flex justify-center w-full md:px-10 min-h-[100vh] border-2 border-red-500" ref={productPageRef}>
        <SideBySideImages images={allImages} filteredDataById={filteredDataById} />
      </div>
    );
  }

  // Cas 3 : 3 images ou plus → carousel + thumbnails
  if (allImages.length > 2) {
    return (
      <>
        <div className="mt-[20vh] flex justify-center w-full md:px-10 min-h-[100vh]" ref={productPageRef}>
          {width > DESKTOP_BREAKPOINT && <ProductLabels />}
          <ProductCardDetails
            filteredDataById={filteredDataById}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
            imageDetailsLength={imageDetailsLength}
            hasValidImageDetails={true}
          />
          {width > DESKTOP_BREAKPOINT && (
            <ThumbnailImagesList
              data={filteredDataById}
              refs={refs}
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
            />
          )}
        </div>
        <div className="mt-20 min-w-screen flex md:justify-center items-center">
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
  }

  // Fallback (sécurité)
  return <ProductSkeleton />;
};

export default ProductPage;
