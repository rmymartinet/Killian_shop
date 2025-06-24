import useWindow from "@/app/hooks/useWindow";
import ProductCarousel from "./ProductCarousel";
import PorductDetails from "./ProductDetails";
import Image from "next/image";
import { TABLET_BREAKPOINT } from "@/utils/responsive";
import { Data, ProductCardProps } from "@/types/dataTypes";

const ProductCardDetails = ({
  filteredDataById,
  currentImageIndex,
  setCurrentImageIndex,
  imageDetailsLength,
  hasValidImageDetails = false,
}: ProductCardProps) => {
  const { width } = useWindow();
  const datas = filteredDataById[0];

  return (
    <div className="flex flex-col lg:gap-10 bg-white lg:mx-10 rounded-xl shadow-lg md:pr-4">
      <div className="flex justify-center">
        {width > TABLET_BREAKPOINT && (
          <div className="flex flex-col justify-center items-center relative rounded-bl-xl rounded-tl-xl">
            <div className="p-4 rounded-xl">
              {filteredDataById.map((item: Data) => (
                <Image
                  className="mb-12 mr-14 self-center cursor-pointer"
                  width={400}
                  height={400}
                  src={item.imageUrls[0] || ""}
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
          hasValidImageDetails={hasValidImageDetails}
        />
      </div>
      <PorductDetails datas={datas} filteredDataById={filteredDataById} />
    </div>
  );
};

    export default ProductCardDetails ;
