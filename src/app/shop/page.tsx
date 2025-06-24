"use client";

import {  useState } from "react";
import { useFilteredData } from "../hooks/useFilteredData";
import ProductContainer from "../_components/ProductContainer";
import ShopFilters from "../_components/ShopFilters";
import ShopSkeleton from "./_components/ShopSkeleton";

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { data, loading } = useFilteredData(activeFilter === "all" ? undefined : activeFilter);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
  };

  // Afficher le skeleton si les données sont en cours de chargement ou si data est undefined
  if (loading || !data) {
    return <ShopSkeleton />;
  }

  return (
    <section className="mt-[20vh] bg-white min-h-screen">
      <div className="mx-auto md:px-4">
        <ShopFilters onFilterChange={handleFilterChange} activeFilter={activeFilter} />
        <ProductContainer data={data} />
      </div>
    </section>
  );
}
