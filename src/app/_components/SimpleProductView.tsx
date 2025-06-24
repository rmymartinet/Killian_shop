import { Data } from "@/types/dataTypes";
import Image from "next/image";
import PorductDetails from "./ProductDetails";

interface SimpleProductViewProps {
  filteredDataById: Data[];
}

const SimpleProductView = ({ filteredDataById }: SimpleProductViewProps) => {
  const datas = filteredDataById[0];

  return (
    <div className="flex flex-col lg:flex-row lg:gap-10 bg-white lg:mx-10 rounded-xl shadow-lg p-6">
      {/* Image principale centrée */}
      <div className="flex justify-center items-center lg:w-1/2">
        <div className="relative">
          <Image
            src={datas.imageUrls[0] || ""}
            width={500}
            height={500}
            alt={datas.title}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      
      {/* Détails du produit */}
      <div className="lg:w-1/2 mt-6 lg:mt-0">
        <PorductDetails datas={datas} filteredDataById={filteredDataById} />
      </div>
    </div>
  );
};

export default SimpleProductView; 