"use client";

import Footer from "@/app/_components/Footer";
import ProductCard from "@/app/_components/ProductCard";
import Shopping from "@/app/_components/Shopping";
import TransitionLink from "@/app/_components/TransitionLinks";
import { useCart } from "@/app/context/CartContext";
import { useAddToCart } from "@/app/hooks/useAddToCart";
import { useItemsFiltered } from "@/app/hooks/useItemsFiltered";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { createRef, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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

  const { data, error, loading } = useItemsFiltered("pants");

  // Filtrer les données basées sur l'ID du produit
  const filteredDataById = data.filter((item: any) => item.id === id);
  const datas = filteredDataById[0];

  // Obtenir la longueur des images
  const imageDetailsLength = filteredDataById.map(
    (item: any) => item.imageDetails.length
  );

  const imageUrls = filteredDataById[0]?.imageUrls.length || 0;

  const [refs, setRefs] = useState([]);

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

  // Fonction pour aller à l'image suivante
  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % imageDetailsLength[0]
    );
  };

  // Fonction pour revenir à l'image précédente
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageDetailsLength[0] - 1 : prevIndex - 1
    );
  };

  const addToCart = useAddToCart();
  const { setIsShoppingOpen } = useCart();

  const TABLET_BREAKPOINT = 768;
  const DESKTOP_BREAKPOINT = 1024;

  return (
    <>
      {/* Contenu fixe au centre */}
      <div className="flex justify-center w-full">
        {/* Affichage pour les écrans desktop */}
        {windowWidth > DESKTOP_BREAKPOINT && (
          <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            <div className="border-2 bg-black text-white font-semibold border-black w-40 h-40 rounded-xl uppercase grid place-content-center">
              100% unique
            </div>
            <div className="border-2 border-black w-40 h-40 rounded-xl uppercase grid place-content-center">
              100% recyclé
            </div>
          </div>
        )}

        <div className="flex flex-col mt-20 lg:gap-10 bg-white lg:mx-10 rounded-xl shadow-lg">
          <div className="flex">
            {/* Affichage de l'image principale pour les écrans tablet et desktop */}
            {windowWidth > TABLET_BREAKPOINT && (
              <div className="flex flex-col justify-center items-center relative rounded-bl-xl rounded-tl-xl">
                <div className="p-4 rounded-xl">
                  {filteredDataById.map((item: any) => (
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
                filteredDataById.map((item: any) => (
                  <Image
                    key={item.id}
                    src={item.imageDetails[currentImageIndex]}
                    width={500}
                    height={500}
                    alt=""
                  />
                ))}
            </div>
          </div>

          {/* Section des détails du produit */}
          <div className="p-10 lg:p-16 rounded-xl relative lg:mt-0 flex flex-col justify-between">
            <div className="flex flex-col gap-10">
              <div className="w-full flex justify-between">
                <div>
                  <span className="uppercase text-slate-400 text-sm md:text-base">
                    Pantalon
                  </span>
                  <h1 className="text-2xl lg:text-4xl">{datas?.title}</h1>
                </div>
                <span className="text-lg font-semibold">
                  {datas?.price},00 €
                </span>
              </div>
              <p className="text-sm font-medium">
                Chaque pièce est unique, assemblée à la main dans une démarche
                écoresponsable, à partir de matériaux recyclés pour un style 100
                % original.
              </p>
              <div className="flex flex-col w-full lg:grid grid-cols-2 justify-between items-center gap-2">
                <div className="rounded-[8px] bg-black text-white py-2 grid place-content-center font-semibold w-full">
                  <button
                    onClick={() => {
                      setIsShoppingOpen(true), addToCart(filteredDataById);
                    }}
                    className="cursor-pointer"
                  >
                    Ajouter au panier <span className="text-sm">(2)</span>
                  </button>
                </div>
                <div className="rounded-[8px] bg-black text-white py-2 grid place-content-center font-semibold w-full">
                  <TransitionLink href={"/checkout"}>
                    <button onClick={() => addToCart(filteredDataById)}>
                      Acheter maintenant
                    </button>
                  </TransitionLink>
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-10">
              <div className="border-t-[1px] border-b-[1px] border-black w-full flex justify-between items-center py-2 px-2">
                <h4>Longueur</h4>
                <span>+</span>
              </div>
              <div className="border-black w-full flex justify-between items-center py-2 px-2">
                <h4>Poids</h4>
                <span>+</span>
              </div>
              <div className="border-t-[1px] border-b-[1px] border-black w-full flex justify-between items-center py-2 px-2">
                <h4>Matériaux</h4>
                <span>+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Miniatures pour les images en desktop */}
        {windowWidth > DESKTOP_BREAKPOINT && filteredDataById.length > 0 && (
          <div className="absolute right-10 top-1/2 -translate-y-1/2 mb-2 w-max flex flex-col justify-center gap-4 bg-black rounded-xl py-2 px-16">
            {filteredDataById[0].imageDetails.map(
              (imageUrl: string, index: number) => (
                <div
                  ref={refs[index]}
                  key={index}
                  className={
                    currentImageIndex === index ? "opacity-100" : "opacity-40"
                  }
                >
                  <Image
                    src={imageUrl}
                    onClick={() => setCurrentImageIndex(index)}
                    width={100}
                    height={100}
                    alt=""
                    className="cursor-pointer hover:opacity-100"
                  />
                </div>
              )
            )}
          </div>
        )}
      </div>
      <div className="mt-20 w-screen md:p-10 overflow-hidden flex justify-center items-center">
        <div className="overflow-x-auto w-full h-full flex justify-center gap-4 lg:gap-40">
          {data
            .filter((item: any) => item.id !== id)
            .map((item: any) => (
              <ProductCard
                key={item.id}
                id={item.id}
                imageSrc={item.imageUrls[currentImage]}
                title={item.title}
                price={item.price}
                imageHeight={200}
                imageWidth={200}
              />
            ))}
        </div>
      </div>
      <Shopping />
      <Footer />
    </>
  );
};

export default ProductPage;
