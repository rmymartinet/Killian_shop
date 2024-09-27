"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Eco from "./_components/Eco";
import Footer from "./_components/Footer";
import ProductCard from "./_components/ProductCard";
import ScrollBanner from "./_components/ScrollBanner";
import { useItemsFiltered } from "./hooks/useItemsFiltered";

interface Item {
  id: string;
  imageUrls: string[];
  title: string;
  price: number;
}

const IMAGE_CHANGE_INTERVAL = 2000;
const TOTAL_IMAGES = 4;

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % TOTAL_IMAGES);
    }, IMAGE_CHANGE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const { data } = useItemsFiltered("pants");

  return (
    <section>
      <div className="h-[60vh] relative flex flex-col items-center justify-center gap-10">
        <div className="absolute top-[40vh]  -translate-y-1/2">
          <Image
            src="/assets/logo_gif.gif"
            width={400}
            height={400}
            alt="Logo"
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-center mt-72 pl-20 pr-20">
        <div className="flex flex-col items-center gap-10 mb-32">
          <ScrollBanner />
          <h1 className="text-4xl lg:text-8xl uppercase font-medium">
            Créations disponibles
          </h1>
        </div>
        <div className="flex justify-center md:justify-between flex-wrap gap-10 w-full">
          {data.map((item: Item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              imageSrc={item.imageUrls[currentImageIndex]}
              title={item.title}
              price={item.price}
            />
          ))}
        </div>
      </div>
      <Eco />
      <Footer />
    </section>
  );
}
