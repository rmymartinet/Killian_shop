"use client";

import { Data } from "@/types/dataTypes";
import { useRef } from "react";
import ProductCard from "./_components/CatalogProductCard";
import { useFilteredData } from "./hooks/useFilteredData";
import TransitionLink from "./_components/TransitionLinks";
import Header from "./_components/Home/Header";

export default function Home() {
  const collectionRef = useRef<HTMLDivElement>(null);
  const { data } = useFilteredData();

  return (
    <section className="overflow-hidden w-screen">
      <div className="fixed -left-10 w-[120%] h-[120%] smoke-mask circle-mask"></div>
      <Header collectionRef={collectionRef} />
      <div ref={collectionRef} className="bg-white w-full z-50 p-4 md:p-8">
        <div className="flex flex-col gap-1">
          <TransitionLink href="/shop">
            Collection disponible [{data.length}]
          </TransitionLink>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-3 grid-flow-row justify-center flex-wrap gap-4 w-full px-8">
          {data.map((item: Data) => (
            <ProductCard
              key={item.id}
              id={item.id}
              imageUrls={item.imageUrls[0]}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
