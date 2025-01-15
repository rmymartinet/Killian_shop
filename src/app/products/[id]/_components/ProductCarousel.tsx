import { Data } from "@/types/dataTypes";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ProductCarousel = ({
  filteredDataById,
  currentImageIndex,
  setCurrentImageIndex,
  imageDetailsLength,
}: {
  filteredDataById: Data[];
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  imageDetailsLength: number[];
}) => {
  const [isNextActive, setIsNextActive] = useState(false);
  const [isPrevActive, setIsPrevActive] = useState(false);

  const handleNextImage = () => {
    const length = imageDetailsLength[0] || 1; // Fournit une valeur par défaut
    setCurrentImageIndex((currentImageIndex + 1) % length);
  };

  const handlePrevImage = () => {
    const length = imageDetailsLength[0] || 1;
    setCurrentImageIndex(
      currentImageIndex === 0 ? length - 1 : currentImageIndex - 1
    );
  };


  return (
    <div className="flex justify-center items-center relative">
      {/* Bouton pour aller à l'image suivante */}
      <div
        onClick={handleNextImage}
        className={`absolute select-none right-0 lg:-right-4 w-10 h-10 rounded-full glassmorphism grid place-content-center cursor-pointer 
              transition-transform duration-100 ease-in-out ${
                isNextActive ? "scale-110" : ""
              }`}
        onMouseDown={() => setIsNextActive(true)}
        onMouseUp={() => setIsNextActive(false)}
        onMouseLeave={() => setIsNextActive(false)}
      >
        <IoIosArrowForward size={20} color="black" />
      </div>
      {/* Bouton pour revenir à l'image précédente */}
      <div
        onClick={handlePrevImage}
        className={`absolute select-none left-0 lg:-left-4 w-10 h-10 rounded-full glassmorphism grid place-content-center cursor-pointer 
              transition-transform duration-100 ease-in-out ${
                isPrevActive ? "scale-110" : ""
              }`}
        onMouseDown={() => setIsPrevActive(true)}
        onMouseUp={() => setIsPrevActive(false)}
        onMouseLeave={() => setIsPrevActive(false)}
      >
        <IoIosArrowBack size={20} color="black" />
      </div>
      {/* Affichage de l'image actuelle */}
      {filteredDataById.length > 0 &&
        filteredDataById.map((item: Data) => (
          <Image
            key={item.id}
            src={
              item?.imageDetails && currentImageIndex < item.imageDetails.length
                ? item.imageDetails[currentImageIndex]
                : ""
            }
            width={400}
            height={400}
            alt=""
          />
        ))}
    </div>
  );
};

export default ProductCarousel;
