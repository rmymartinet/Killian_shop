import useWindow from "@/app/hooks/useWindow";
import ProductCarousel from "./ProductCarousel";
import PorductDetails from "./ProductDetails";
import Image from "next/image";
import { TABLET_BREAKPOINT } from "@/utils/responsive";
import { useCart } from "@/app/context/CartContext";
import { Data, ProductDetailsCardProps } from "@/types/dataTypes";
import { useAddToCart } from "@/app/hooks/useAddToCart";

const ProductDetailsCard = ({
  filteredDataById,
  currentImageIndex,
  setCurrentImageIndex,
  imageDetailsLength,
}: ProductDetailsCardProps) => {
  const { width } = useWindow();
  const { setIsShoppingOpen } = useCart();
  const addToCart = useAddToCart();
  const datas = filteredDataById[0];

  return (
    <div className="flex flex-col lg:gap-10 bg-white lg:mx-10 rounded-xl shadow-lg">
      <div className="flex justify-center">
        {width > TABLET_BREAKPOINT && (
          <div className="flex flex-col justify-center items-center relative rounded-bl-xl rounded-tl-xl">
            <div className="p-4 rounded-xl">
              {filteredDataById.map((item: Data) => (
                <Image
                  className="mb-12 mr-14 self-center cursor-pointer"
                  width={400}
                  height={400}
                  src={item.imageUrls[0]}
                  alt=""
                  key={item.id}
                />
              ))}
            </div>
          </div>
        )}
        <ProductCarousel
          filteredDataById={filteredDataById}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          imageDetailsLength={imageDetailsLength}
        />
      </div>
      <PorductDetails
        datas={datas}
        filteredDataById={filteredDataById}
        setIsShoppingOpen={setIsShoppingOpen}
        addToCart={addToCart}
      />
    </div>
  );
};

export default ProductDetailsCard;
