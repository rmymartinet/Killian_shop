"use client";

import ProductCard from "@/app/_components/ProductCard";
import { useCart } from "@/app/context/CartContext";
import { useAddToCart } from "@/app/hooks/useAddToCart";
import { useFilteredData } from "@/app/hooks/useFilteredData";
import { Data } from "@/types/dataTypes";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { createRef, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ImagesList from "./_components/ImagesList";
import PorductDetails from "./_components/ProductDetails";
import ProductLabels from "./_components/ProductLabels";

gsap.registerPlugin(ScrollTrigger);

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = ({ params }: ProductPageProps) => {
  const { id } = params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isNextActive, setIsNextActive] = useState(false);
  const [isPrevActive, setIsPrevActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const TABLET_BREAKPOINT = 768;
  const DESKTOP_BREAKPOINT = 1024;

  const { data }: { data: Data[]; loading: boolean } = useFilteredData("pants");

  // Filtrer les données basées sur l'ID du produit
  const filteredDataById = data.filter((item: Data) => item.id === id);
  const datas = filteredDataById[0];

  // Obtenir la longueur des images
  const imageDetailsLength = filteredDataById.map(
    (item: Data) => item.imageDetails?.length
  );
  const imageUrls = filteredDataById[0]?.imageUrls.length || 0;
  const [refs, setRefs] = useState([]);
  // Fonction pour aller à l'image suivante
  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % (imageDetailsLength[0] || 0)
    );
  };

  // Fonction pour revenir à l'image précédente
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (imageDetailsLength[0] || 0) - 1 : prevIndex - 1
    );
  };

  const addToCart = useAddToCart();
  const { setIsShoppingOpen } = useCart();

  const nextImage = useSwipeable({
    onSwipedLeft: () => handleNextImage(),
    trackMouse: true,
  });

  const prevImage = useSwipeable({
    onSwipedRight: () => handlePrevImage(),
    trackMouse: true,
  });

  // Créer des références pour les miniatures des images
  useEffect(() => {
    setRefs((refs) =>
      Array(imageDetailsLength.length)
        .fill(null)
        .map((_, i) => refs[i] || createRef())
    );
  }, [imageDetailsLength.length]);

  // Gestion de la taille de la fenêtre
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Carrousel automatique qui change toutes les 2 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imageUrls);
    }, 2000);
    return () => clearInterval(interval);
  }, [imageUrls]);

  return (
    <>
      {/* Contenu fixe au centre */}
      <div className="mt-20 flex justify-center w-full px-10">
        {/* Affichage pour les écrans desktop */}
        {windowWidth > DESKTOP_BREAKPOINT && <ProductLabels />}
        <div className="flex flex-col lg:gap-10 bg-white lg:mx-10 rounded-xl shadow-lg">
          <div className="flex justify-center">
            {/* Affichage de l'image principale pour les écrans tablet et desktop */}
            {windowWidth > TABLET_BREAKPOINT && (
              <div className="flex flex-col justify-center items-center relative rounded-bl-xl rounded-tl-xl ">
                <div className="p-4 rounded-xl">
                  {filteredDataById.map((item: Data) => (
                    <Image
                      className="mb-12 mr-14 self-center cursor-pointer"
                      width={400}
                      height={400}
                      src={item.imageUrls[currentImage]}
                      alt=""
                      key={item.id}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center items-center relative">
              {/* Bouton pour aller à l'image suivante */}
              <div
                {...nextImage}
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
                {...prevImage}
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
                    src={item?.imageDetails[currentImageIndex] ?? ""}
                    width={400}
                    height={400}
                    alt=""
                  />
                ))}
            </div>
          </div>

          {/* Section des détails du produit */}
          <PorductDetails
            datas={datas}
            filteredDataById={filteredDataById}
            setIsShoppingOpen={setIsShoppingOpen}
            addToCart={addToCart}
          />
        </div>
        {/* Miniatures pour les images en desktop */}
        {windowWidth > DESKTOP_BREAKPOINT && filteredDataById.length > 0 && (
          <ImagesList
            data={filteredDataById}
            refs={refs}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
        )}
      </div>
      <div className="mt-20 min-w-screen  overflow-hidden flex justify-center items-center">
        <div className="overflow-x-auto w-full h-full flex justify-center gap-4 lg:gap-40">
          {data
            .filter((item: Data) => item.id !== id)
            .map((item: Data) => (
              <ProductCard
                key={item.id}
                id={item.id}
                imageUrls={item.imageUrls[currentImage]}
                title={item.title}
                price={item.price}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
