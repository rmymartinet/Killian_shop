"use client";

import { revealBlockAnimation } from "@/utils/Animation";
import { useRef } from "react";


interface ShopFiltersProps {
  onFilterChange: (category: string) => void;
  activeFilter: string;
}

const categories = [
  { id: "all", name: "Tous" },
  { id: "pants", name: "Pantalons" },
  { id: "shirts", name: "Tee-shirts" },

];



export default function ShopFilters({ onFilterChange, activeFilter }: ShopFiltersProps) {

  const shopFiltersRef = useRef<HTMLDivElement>(null);

revealBlockAnimation({ref: shopFiltersRef, delay: 0.5});
  return (
    <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-6 md:mb-8 px-4" ref={shopFiltersRef}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onFilterChange(category.id)}
          className={`px-3 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-lg border-2 transition-all duration-300 ${
            activeFilter === category.id
              ? "border-black bg-black text-white"
              : "border-gray-300 bg-white text-black hover:border-black"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
} 