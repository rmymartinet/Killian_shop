import { Data } from "@/types/dataTypes";
import Image from "next/image";
import TransitionLink from "./TransitionLinks";

const ProductCard = ({
  imageUrls,
  id,
  title,
  imageWidth,
  imageHeight,
  quantity,
}: Data) => {
  const isOutOfStock = quantity === 0;

  return (
    <div
      className={`flex flex-col justify-center items-center ${
        isOutOfStock ? "opacity-50 blur-[1px]" : ""
      }`}
    >
      <div className="flex flex-col items-center">
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
        <TransitionLink
          label={title}
          href={`/products/${id}`}
          className="text-sm text-black border-b border-black cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ProductCard;
