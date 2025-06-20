import { Data } from "@/types/dataTypes";
import ProductCard from "./ProductCard";

export default function ProductGrid({ data }: { data: Data[] }) {

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 grid-flow-row justify-center gap-4 w-full px-8">
      {data.map((item: Data, index: number) => (
        <ProductCard
          key={item.id}
          id={item.id}
          imageFace={item.imageFace || ""}
          title={item.title}
          price={item.price}
          quantity={item.quantity}
          imageEnsemble={item.imageEnsemble}
          index={index}
        />
      ))}
    </div>
  );
}