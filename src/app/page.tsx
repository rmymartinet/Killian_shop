"use client";

import { Data } from "@/types/dataTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import EcologyContainer from "./_components/EcologyContainer";
import ProductCard from "./_components/ProductCard";
import { useFilteredData } from "./hooks/useFilteredData";
import useWindow from "./hooks/useWindow";

const IMAGE_CHANGE_INTERVAL = 2000;
const TOTAL_IMAGES = 4;

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % TOTAL_IMAGES);
    }, IMAGE_CHANGE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const { data } = useFilteredData("pants");
  const { width } = useWindow();

  return (
    <section>
      <div className="relative flex flex-col items-center justify-center gap-10">
        <Image
          className="shadow-xl"
          width={600}
          height={600}
          src="/assets/banner1.png"
          alt=""
        />
        {width > 498 && (
          <>
            <div className="absolute top-[390px] md:right-12 lg:right-72 w-72 h-52 overflow-hidden">
              <video
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
                loop
                src="/assets/videos/banner.mp4"
              />
            </div>
            <Image
              className="absolute top-20 md:left-4 lg:left-20"
              width={200}
              height={200}
              src="/assets/marseille.png"
              alt=""
            />
            <Image
              className="absolute top-12 md:right-20 lg:left-[420px]"
              width={100}
              height={100}
              src="/assets/brocante.png"
              alt=""
            />
            <Image
              className="absolute top-72 left-20 lg:left-72"
              width={200}
              height={200}
              src="/assets/erwan.jpg"
              alt=""
            />
            <Image
              className="absolute top-20 lg:right-[400px]"
              width={150}
              height={150}
              src="/assets/pants_love.jpg"
              alt=""
            />
            <Image
              className="absolute top-46 right-[200px]"
              width={150}
              height={150}
              src="/assets/remy.jpg"
              alt=""
            />
          </>
        )}
        {width > 1024 && (
          <h1 className="absolute top-0 text-[7vw] text-white mix-blend-difference uppercase">
            sois fier de tes sapes
          </h1>
        )}
      </div>

      <div className="w-max lg:px-40 flex flex-col items-start gap-20 mt-40">
        {/* <ScrollBanner /> */}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl uppercase font-medium">
            Créations disponibles
          </h1>
          <div className="flex items-center gap-4">
            <p className="underline cursor-pointer">Voir tous les produits</p>
            <IoIosArrowRoundForward />
          </div>
        </div>
        <div className="flex md:justify-center gap-4 w-full overflow-x-auto  hide-scrollbar">
          {data.map((item: Data) => (
            <ProductCard
              key={item.id}
              id={item.id}
              imageUrls={item.imageUrls[currentImageIndex]}
              title={item.title}
              price={item.price}
            />
          ))}
        </div>
      </div>
      <div className="flex lg:px-40 flex-col items-start gap-20 mt-40">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl uppercase font-medium">
            Une marque éco-responsable
          </h1>
          <div className="flex items-center gap-4">
            <p className="underline cursor-pointer">La vision de la marque</p>
            <IoIosArrowRoundForward />
          </div>
        </div>
        <EcologyContainer />
      </div>
    </section>
  );
}
