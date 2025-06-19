"use client"


import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductCard({
  id,
  imageFace,
  title,
  price,
  quantity,
  imageEnsemble,
}: {
  id: string;
  imageFace: string;
  title: string;
  price: number;
  quantity?: number;
  imageEnsemble?: string;
}) {
  const [hover, setHover] = useState(false);
  const isOutOfStock = quantity === 0;

  // Image à afficher selon hover
  const mainImage = imageFace;
  const detailImage = imageEnsemble || mainImage;

  return (
    <div className="flex flex-col gap-4 h-full w-full max-w-lg max-h-lg min-w-[200px] min-h-[200px]">
      <div
        className="p-6 bg-[#fafafa] relative flex-1 min-h-0"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {isOutOfStock ? (
          <div className="relative w-full h-full max-w-sm max-h-sm">
            <div className="opacity-50 blur-[1px] w-full h-full">
              <Image
                src={hover ? mainImage : detailImage}
                alt={title}
                width={700}
                height={700}
                priority
                quality={100}
                loading="eager"
                className="w-full h-full object-cover cursor-not-allowed"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black bg-opacity-70 text-white text-sm font-semibold p-2">
              Épuisé
            </div>
          </div>
        ) : (
          <Link href={`/products/${id}`} className="text-sm text-black cursor-pointer block w-full h-full">
            <Image
              src={hover ? mainImage : detailImage}
              alt={title}
              width={700}
              height={700}
              priority
              quality={100}
              loading="eager"
              className="w-full h-full object-cover"
            />
          </Link>
        )}
      </div>
      <div className="flex-shrink-0 pl-6 pb-6">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm">€{price}.00 EUR</p>
      </div>
    </div>
  );
}