import { Data } from "@/types/dataTypes";
import Image from "next/image";
import PorductDetails from "./ProductDetails";

interface SideBySideImagesProps {
  filteredDataById: Data[];
  images: string[];
}

const SideBySideImages = ({ filteredDataById, images }: SideBySideImagesProps) => {
  const datas = filteredDataById[0];

  return (
    <div className="flex flex-col lg:flex-row lg:gap-10 bg-white lg:mx-10 rounded-xl shadow-lg p-6 h-max">
      {/* Images côte à côte */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full md:w-1/2">
        {images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            width={350}
            height={350}
            alt={datas.title + " image " + (idx + 1)}
            className="rounded-lg object-cover w-full md:w-auto"
            style={{ maxWidth: 350, maxHeight: 350 }}
          />
        ))}
      </div>
      {/* Détails du produit */}
      <div className="lg:w-1/2 mt-6 lg:mt-0">
        <PorductDetails datas={datas} filteredDataById={filteredDataById} />
      </div>
    </div>
  );
};

export default SideBySideImages; 