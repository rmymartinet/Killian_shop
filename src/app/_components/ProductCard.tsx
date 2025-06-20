"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRevealBlockAnimation } from "@/utils/Animation";

export default function ProductCard({
  id,
  imageFace,
  title,
  price,
  quantity,
  imageEnsemble,
  index = 0,
}: {
  id: string;
  imageFace: string;
  title: string;
  price: number;
  quantity?: number;
  imageEnsemble?: string;
  index?: number;
}) {
  const [hover, setHover] = useState(false);
  const isOutOfStock = quantity === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  // Image à afficher selon hover
  const mainImage = imageFace;
  const detailImage = imageEnsemble;

  // Animation de révélation avec délai progressif
  useRevealBlockAnimation({ 
    ref: cardRef, 
    delay: index * 0.1 // 0.1s de délai entre chaque carte
  });

  useEffect(() => {
    // Détection mobile côté client
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleImageClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault(); // évite d'ouvrir le lien sur mobile
      setShowDetail((prev) => !prev);
    }
  };

  return (
    <div 
      ref={cardRef}
      className="flex flex-col gap-4 h-full w-full"
    >
      <div
        className="p-6 bg-[#fafafa] relative overflow-hidden"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {isOutOfStock ? (
          <div className="relative w-full h-full max-w-sm max-h-sm">
            <div className="opacity-50 blur-[1px] w-full h-full">
              {isMobile ? (
                <div className="block w-full h-full relative aspect-[4/5]">
                  <Image
                    src={showDetail ? (detailImage || mainImage || "/assets/images/face.png") : (mainImage || "/assets/images/face.png")}
                    alt={title}
                    fill
                    priority
                    quality={100}
                    loading="eager"
                    className="object-contain"
                    onClick={handleImageClick}
                    style={{ touchAction: "manipulation", cursor: "pointer" }}
                  />
                  {/* Hint mobile */}
                  <div
                    className="
                      absolute bottom-2 left-1/2 -translate-x-1/2
                      bg-gray-800 bg-opacity-70 text-white text-xs px-3 py-1 rounded-lg
                      animate-pulse pointer-events-none
                      z-50
                    "
                    style={{ transition: "opacity 0.5s" }}
                  >
                    👆 Clique sur l&apos;image pour voir l&apos;autre vue
                  </div>
                  {/* Bouton pour accéder à la fiche produit */}
                  <button
                    className="mt-2 mx-auto block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    onClick={() => window.location.href = `/products/${id}`}
                  >
                    Voir la fiche produit
                  </button>
                </div>
              ) : (
                <Link href={`/products/${id}`} className="text-sm text-black cursor-pointer block w-full h-full relative aspect-[4/5]">
                  <Image
                    src={
                      isMobile
                        ? (showDetail ? (detailImage || mainImage || "/assets/images/face.png") : (mainImage || "/assets/images/face.png"))
                        : (hover ? (detailImage || mainImage || "/assets/images/face.png") : (mainImage || "/assets/images/face.png"))
                    }
                    alt={title}
                    fill
                    priority
                    quality={100}
                    loading="eager"
                    className="object-contain"
                    onClick={handleImageClick}
                    style={{ touchAction: "manipulation" }}
                  />
                </Link>
              )}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black bg-opacity-70 text-white text-sm font-semibold p-2">
              Épuisé
            </div>
          </div>
        ) : (
          <Link href={`/products/${id}`} className="text-sm text-black cursor-pointer block w-full h-full relative aspect-[4/5]">
            <Image
              src={
                isMobile
                  ? (showDetail ? (detailImage || mainImage || "/assets/images/face.png") : (mainImage || "/assets/images/face.png"))
                  : (hover ? (detailImage || mainImage || "/assets/images/face.png") : (mainImage || "/assets/images/face.png"))
              }
              alt={title}
              fill
              priority
              quality={100}
              loading="eager"
              className="object-contain"
              onClick={handleImageClick}
              style={{ touchAction: "manipulation" }}
            />
          </Link>
        )}
        {/* Optionnel : petit indicateur sur mobile */}
        {isMobile && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {showDetail ? "Vue d'ensemble" : "Vue de face"}
          </div>
        )}
        {!isMobile && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {hover ? "Vue d'ensemble" : "Vue de face"}
          </div>
        )}
       
      </div>
      <div className="flex flex-col gap-4">
      <div className="flex justify-between md:flex-col md:pl-6 md:pb-6">
        <p className="text-sm font-semibold h-10">{title}</p>
        <p className="text-sm">€{price}.00 EUR</p>
      </div>
      {isMobile && (
          <button
            className="mt-2 block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            onClick={() => window.location.href = `/products/${id}`}
          >
            Voir la fiche produit
          </button>
        )}
      </div>
    </div>
  );
}