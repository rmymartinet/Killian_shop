"use client";

import { Data } from "@/types/dataTypes";
import { useEffect, useState } from "react";
import ProductCard from "../_components/ProductCard";
import { useFilteredData } from "../hooks/useFilteredData";

export default function Shop() {
  const { data } = useFilteredData("pants");
  const IMAGE_CHANGE_INTERVAL = 2000;
  const TOTAL_IMAGES = 4;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % TOTAL_IMAGES);
    }, IMAGE_CHANGE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-20">
      {/* <div className="flex gap-2 px-40">
        <h1 className="p-2 bg-slate-200 rounded-xl">Filtrer</h1>
        <div className="p-2 bg-slate-200 rounded-xl flex gap-2 items-center">
          <p>Trier par</p>
          <MdOutlineKeyboardArrowRight />
        </div>
      </div> */}
      <div className="mt-20 flex justify-center flex-wrap gap-4 w-full">
        {data.map((item: Data) => (
          <ProductCard
            key={item.id}
            id={item.id}
            imageUrls={item.imageUrls[currentImageIndex]}
            title={item.title}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
}
