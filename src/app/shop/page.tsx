"use client";

import { useState } from "react";
import { useFilteredData } from "../hooks/useFilteredData";
import ProductContainer from "../_components/ProductContainer";
import ShopFilters from "../_components/ShopFilters";

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { data } = useFilteredData(activeFilter === "all" ? undefined : activeFilter);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
  };

  return (
    <section className="mt-[20vh] bg-white min-h-screen">
      <div className="mx-auto md:px-4">
        <ShopFilters onFilterChange={handleFilterChange} activeFilter={activeFilter} />
        <ProductContainer data={data} />
      </div>
    </section>
  );
}
