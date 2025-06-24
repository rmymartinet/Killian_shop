import { Data } from "@/types/dataTypes";
import Image from "next/image";
import PorductDetails from "./ProductDetails";

interface SideBySideImagesProps {
  filteredDataById: Data[];
}

const SideBySideImages = ({ filteredDataById }: SideBySideImagesProps) => {
  const datas = filteredDataById[0];
  const imageFace = datas.imageFace || (datas.imageUrls?.[0] || null);
  const imageEnsemble = datas.imageEnsemble || (datas.imageUrls?.[1] || null);

  return (
    <div className="flex flex-col lg:flex-row lg:gap-10 bg-white lg:mx-10 rounded-xl shadow-lg p-6">
      {/* Images côte à côte */}
      <div className="flex flex-row gap-4 justify-center items-center lg:w-1/2">
        {imageFace && (
          <Image
            src={imageFace}
            width={350}
            height={350}
            alt={datas.title + " face"}
            className="rounded-lg object-cover"
          />
        )}
        {imageEnsemble && (
          <Image
            src={imageEnsemble}
            width={350}
            height={350}
            alt={datas.title + " ensemble"}
            className="rounded-lg object-cover"
          />
        )}
      </div>
      {/* Détails du produit */}
      <div className="lg:w-1/2 mt-6 lg:mt-0">
        <PorductDetails datas={datas} filteredDataById={filteredDataById} />
      </div>
    </div>
  );
};

export default SideBySideImages; 