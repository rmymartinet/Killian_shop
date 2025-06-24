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

  // Extraction des images
  const imageFace = product?.imageFace || (product?.imageUrls?.[0] || null);
  const imageEnsemble = product?.imageEnsemble || (product?.imageUrls?.[1] || null);
  const imageDetails = product?.imageDetails || [];
  const hasImageFace = !!imageFace;
  const hasImageEnsemble = !!imageEnsemble;
  const hasImageDetails = Array.isArray(imageDetails) && imageDetails.length > 0 && imageDetails.some((img) => img && img.trim() !== "");

  // Pour le carousel/thumbnails
  const imageDetailsLength = (hasImageFace || hasImageEnsemble) && hasImageDetails ? [imageDetails.length] : [0];



  // Toujours à la racine !
  useEffect(() => {
    if ((hasImageFace || hasImageEnsemble) && hasImageDetails) {
      setRefs((refs) =>
        Array(imageDetailsLength.length)
          .fill(null)
          .map((_, i) => refs[i] || createRef())
      );
    }
  }, [hasImageFace, hasImageEnsemble, hasImageDetails, imageDetails.length]);

  // Gestion du chargement et des erreurs
  if (loading) return <ProductSkeleton />;
  if (!product || (!hasImageFace && !hasImageEnsemble)) return <ProductSkeleton />;

  // Cas 1 : Seulement image de face
  if (hasImageFace && !hasImageEnsemble && !hasImageDetails) {
    return (
      <div className="mt-[20vh] flex justify-center w-full md:px-10 min-h-[100vh]" ref={productPageRef}>
        <SimpleProductView filteredDataById={filteredDataById} />
      </div>
    );
  }

  // Cas 2 : Image de face ET ensemble, mais pas d'image détail
  if (hasImageFace && hasImageEnsemble && !hasImageDetails) {
    return (
      <div className="mt-[20vh] flex justify-center w-full md:px-10 min-h-[100vh]" ref={productPageRef}>
        <SideBySideImages filteredDataById={filteredDataById} />
      </div>
    );
  }

  // Cas 3 : Image de face ou ensemble ET au moins une image détail
  if ((hasImageFace || hasImageEnsemble) && hasImageDetails) {
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
