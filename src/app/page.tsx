"use client";

import { useRef } from "react";
import { useFilteredData } from "./hooks/useFilteredData";
import Header from "./_components/Home/Header";
import ScrollHint from "./_components/ScrollHint";
import ProductContainer from "./_components/ProductContainer";

export default function Home() {
  const collectionRef = useRef<HTMLDivElement>(null);
  const { data } = useFilteredData();

  return (
    <section className="overflow-hidden w-screen">
      <Header collectionRef={collectionRef} />
      <ScrollHint />
        <div className="flex flex-col gap-4 bg-white w-full z-50">
          <ProductContainer data={data} />
        </div>
    </section>
  );
}
