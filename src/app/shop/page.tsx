"use client";

import { Data } from "@/types/dataTypes";
import { useState } from "react";
import { useFilteredData } from "../hooks/useFilteredData";
import Image from "next/image";
import TransitionLink from "../_components/TransitionLinks";

export default function Shop() {
  const { data } = useFilteredData();

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleHover = (index: number) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <section className="mt-20 bg-white min-h-[100vh]">
      <div className="flex flex-col mt-40 gap-10 px-4 md:px-8">
        <h1 className="text-lg">Tous [{data.length}]</h1>
        <div className="flex flex-col lg:grid lg:grid-cols-3 grid-flow-row justify-center gap-4 w-full">
          {data.map((item: Data, index) => (
            <div key={item.id} className="flex flex-col gap-6">
              <div
                className="p-10 bg-[#fafafa]"
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={handleMouseLeave}
              >
                <TransitionLink
                  href={`/products/${item.id}`}
                  className="text-sm text-black border-b border-black cursor-pointer"
                >
                  <Image
                    src={
                      hoverIndex === index
                        ? item.imageUrls[0]
                        : item.imageDetails?.[0] ?? ""
                    }
                    alt=""
                    width={700}
                    height={700}
                    className="w-full h-full object-cover"
                  />
                </TransitionLink>
              </div>
              <div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-sm">€{item.price}.00 EUR</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
