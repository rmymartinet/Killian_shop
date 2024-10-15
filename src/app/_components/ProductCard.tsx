import { Data } from "@/types/dataTypes";
import Image from "next/image";
import TransitionLink from "./TransitionLinks";

const ProductCard = ({
  imageUrls,
  id,
  price,
  title,
  imageWidth,
  imageHeight,
  quantity,
}: Data) => {
  const isOutOfStock = quantity === 0;

  return (
    <div
      className={`flex flex-col justify-center items-center border border-slate-200 p-2 ${
        isOutOfStock ? "opacity-50 blur-[1px]" : ""
      }`}
    >
      <TransitionLink href={`/products/${id}`}>
        <div className="flex flex-col items-center gap-20 lg:gap-40">
          <div className="w-48 h-48 mr-10 lg:w-[20vw] lg:h-[20vw]">
            <Image
              className="mb-12 self-center cursor-pointer"
              width={imageWidth || 700}
              height={imageHeight || 700}
              src={imageUrls}
              alt={title || "Produit"}
            />
          </div>
          <div className="flex items-center justify-between w-full text-sm px-2">
            <div className="flex flex-col items-start justify-start gap-1">
              <span className="font-semibold flex-1 text-black">{title}</span>
              <p className="text-slate-500 flex-1 lg:text-end justify-self-end">
                {price},00 €
              </p>
            </div>
            {isOutOfStock ? (
              <span className="text-red-500">Out of Stock</span>
            ) : (
              <span className="text-black w-7 h-7 rounded-full glassmorphism  grid place-content-center">
                +
              </span>
            )}
          </div>
        </div>
      </TransitionLink>
    </div>
  );
};

export default ProductCard;
