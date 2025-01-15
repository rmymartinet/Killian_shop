import { Data } from "@/types/dataTypes";
import Image from "next/image";
import TransitionLink from "./TransitionLinks";

const CatalogProductCard = ({
  imageUrls,
  id,
  title,
  imageWidth,
  imageHeight,
  quantity,
}: Data) => {
  const isOutOfStock = quantity === 0;

  return (
    <div className="flex flex-col justify-center items-center relative">
      {isOutOfStock && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black bg-opacity-70 text-white text-sm font-semibold p-2">
          Épuisé
        </div>
      )}
      <div
        className={`flex flex-col items-center ${
          isOutOfStock ? "opacity-50 blur-[1px]" : ""
        }`}
      >
        {isOutOfStock ? (
          <div className="lg:w-[25vw]">
            <Image
              className="self-center pr-10 w-full h-full object-cover cursor-not-allowed"
              width={imageWidth || 700}
              height={imageHeight || 700}
              src={imageUrls}
              alt={title || "Produit"}
            />
          </div>
        ) : (
          <TransitionLink href={`/products/${id}`}>
            <div className="lg:w-[25vw]">
              <Image
                className="self-center pr-10 w-full h-full object-cover cursor-pointer"
                width={imageWidth || 700}
                height={imageHeight || 700}
                src={imageUrls}
                alt={title || "Produit"}
              />
            </div>
          </TransitionLink>
        )}
        {isOutOfStock ? (
          <span className="text-sm text-black border-b border-black cursor-not-allowed">
            {title}
          </span>
        ) : (
          <TransitionLink
            label={title}
            href={`/products/${id}`}
            className="text-sm text-black border-b border-black cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default CatalogProductCard;
