"use client"

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRevealBlockAnimation } from "@/utils/Animation";
import { useRouter } from "next/navigation";

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
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showDetail] = useState(false);
  const router = useRouter();

  // Détection intelligente des images
  const hasFace = !!imageFace;
  const hasEnsemble = !!imageEnsemble;
  const hasBoth = hasFace && hasEnsemble;
  const onlyFace = hasFace && !hasEnsemble;
  const onlyEnsemble = !hasFace && hasEnsemble;

  // Image à afficher selon hover/switch
  let displayedImage = imageFace;
  let label = "";
  if (hasBoth) {
    displayedImage = isMobile
      ? (showDetail ? imageEnsemble : imageFace)
      : (hover ? imageEnsemble : imageFace);
    label = isMobile ? (showDetail ? "Vue d'ensemble" : "Vue de face") : (hover ? "Vue d'ensemble" : "Vue de face");
  } else if (onlyFace) {
    displayedImage = imageFace;
    label = "Vue de face";
  } else if (onlyEnsemble) {
    displayedImage = imageEnsemble;
    label = "Vue d'ensemble";
  }

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

  // Gestionnaire de navigation personnalisé pour forcer le scroll to top
  const handleNavigation = (e: React.MouseEvent) => {
    if (quantity === 0) return; // Désactive le clic si out of stock
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setTimeout(() => {
      router.push(`/shop/${id}`);
    }, 100);
  };

  const isOutOfStock = !quantity || quantity === 0;

  return (
    <div 
      ref={cardRef}
      className="flex flex-col gap-4 h-full w-full"
    >
      <div
        className={`p-6 bg-white border border-gray-200 rounded-lg relative overflow-hidden ${isOutOfStock ? 'opacity-60 blur-[2px] pointer-events-none' : ''}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ minHeight: 320 }}
      >
        <div 
          onClick={handleNavigation}
          className="text-sm text-black cursor-pointer block w-full h-full relative aspect-[4/5]"
        >
          <Image
            src={displayedImage || "/assets/images/face.png"}
            alt={title}
            fill
            priority
            quality={100}
            loading="eager"
            className="object-contain"
            style={{ background: '#fff', borderRadius: 8 }}
          />
        </div>
        {/* Label dynamique en bas à droite */}
        {label && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {label}
          </div>
        )}
        {/* Bandeau No stock */}
        {isOutOfStock && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-80 text-white text-lg font-bold px-4 py-2 rounded">
            No stock
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between md:flex-col md:pl-6 md:pb-6">
          <p className="text-sm font-semibold h-10">{title}</p>
          <p className="text-sm">€{price}.00 EUR</p>
        </div>
        {isMobile && !isOutOfStock && (
          <button
            className="mt-2 block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            onClick={handleNavigation}
          >
            Voir la fiche produit
          </button>
        )}
      </div>
    </div>
  );
}