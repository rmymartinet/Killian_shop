"use client";

import { useRef } from "react";
import { useFilteredData } from "./hooks/useFilteredData";
import TransitionLink from "./_components/TransitionLinks";
import Header from "./_components/Home/Header";
import ProductGrid from "./_components/ProductGrid";
import ScrollHint from "./_components/ScrollHint";
import ProductContainer from "./_components/ProductContainer";

export default function Home() {
  const collectionRef = useRef<HTMLDivElement>(null);
  const { data } = useFilteredData();

  return (
    <section className="overflow-hidden w-screen">
      {/* <div className="fixed -left-10 w-[120%] h-[120%] smoke-mask circle-mask"></div> */}
      <Header collectionRef={collectionRef} />
      <ScrollHint />
      <div ref={collectionRef} className="bg-white w-full z-50 p-4 md:p-8">
        <div className="flex flex-col gap-4">
          <ProductContainer data={data} />
        </div>
      </div>
    </section>
  );
}
