import Image from "next/image";
import TransitionLink from "./TransitionLinks";

interface ProductCardProps {
  imageSrc: string; // Ce doit être une chaîne, pas un tableau
  id: string;
  price: string;
  title: string;
  imageWidth?: number;
  imageHeight?: number;
}

const ProductCard = ({
  imageSrc,
  id,
  price,
  title,
  imageWidth,
  imageHeight,
}: ProductCardProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <TransitionLink href={`/products/${id}`}>
        <div className="flex flex-col items-center gap-20 lg:gap-40">
          <div className="w-48 h-48 mr-10 lg:w-[25vw] lg:h-[25vw]">
            <Image
              className="mb-12 self-center cursor-pointer"
              width={imageWidth || 700}
              height={imageHeight || 700}
              src={imageSrc}
              alt={title || "Produit"}
              layout="responsive"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col items-start lg:grid lg:grid-cols-2 lg:w-full">
            <span className="font-semibold flex-1 text-black">{title}</span>
            <p className="text-slate-500 flex-1 lg:text-end">{price},00 €</p>
          </div>
        </div>
      </TransitionLink>
    </div>
  );
};

export default ProductCard;
