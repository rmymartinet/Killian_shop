import { Data } from "@/types/dataTypes";
import ProductGrid from "./ProductGrid";

const ProductContainer = ({data}: {data: Data[]}) => {
  return (
    <div className="flex flex-col gap-4 md:p-8 mt-10 md:mt-0">
        <span className="text-sm text-black pl-4 md:pl-0 ">Items disponibles [ {data.length} ]</span>
        <ProductGrid data={data} />
    </div>
  );
};

export default ProductContainer;