"use client";

import { Data } from "@/types/dataTypes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
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
          className="shadow-xl relative"
          width={600}
          height={600}
          src="/assets/identity.png"
          alt=""
        />

        {width > 1024 && (
          <>
            <Image
              className="absolute top-[30vh] right-[30vw] "
              width={150}
              height={150}
              src="/assets/custom_jean.png"
              alt=""
            />
            <Image
              className="absolute top-[5vh] left-[5vw]"
              width={200}
              height={200}
              src="/assets/nike_shoes.png"
              alt=""
            />
            <Image
              className="absolute -top-[5vh] left-[25vw]"
              width={120}
              height={120}
              src="/assets/brocante.png"
              alt=""
            />
            <Image
              className="absolute top-[10vh] left-[23vw]"
              width={200}
              height={200}
              src="/assets/erwan.jpg"
              alt=""
            />
            <Image
              className="absolute top-[5vh] right-[30vw]"
              width={150}
              height={150}
              src="/assets/pants_love.jpg"
              alt=""
            />
            <Image
              className="absolute top-[10vh] right-[10vw]"
              width={170}
              height={170}
              src="/assets/remy.jpg"
              alt=""
            />
          </>
        )}
        {width < 1025 && width > 498 && (
          <>
            <Image
              className="absolute top-[37vh] right-[5vw] -z-10"
              width={100}
              height={100}
              src="/assets/custom_jean.png"
              alt=""
            />
            <Image
              className="absolute top-[5vh] left-[5vw]"
              width={100}
              height={100}
              src="/assets/nike_shoes.png"
              alt=""
            />
            <Image
              className="absolute left-[15vw]"
              width={120}
              height={120}
              src="/assets/brocante.png"
              alt=""
            />
            <Image
              className="absolute top-[15vh] left-[5vw] -z-10"
              width={200}
              height={200}
              src="/assets/erwan.jpg"
              alt=""
            />
            <Image
              className="absolute top-[0vh] right-[5vw]"
              width={150}
              height={150}
              src="/assets/pants_love.jpg"
              alt=""
            />
            <Image
              className="absolute top-[15vh] right-[10vw]"
              width={170}
              height={170}
              src="/assets/remy.jpg"
              alt=""
            />
          </>
        )}
        {width < 498 && (
          <>
            <Image
              className="absolute top-[25vh] right-[5vw]"
              width={50}
              height={50}
              src="/assets/custom_jean.png"
              alt=""
            />
            <Image
              className="absolute top-[5vh] left-[5vw]"
              width={50}
              height={50}
              src="/assets/nike_shoes.png"
              alt=""
            />
            <Image
              className="absolute -top-[5vh] left-[15vw]"
              width={70}
              height={70}
              src="/assets/brocante.png"
              alt=""
            />
            <Image
              className="absolute top-[20vh] left-[5vw]"
              width={70}
              height={70}
              src="/assets/erwan.jpg"
              alt=""
            />
            <Image
              className="absolute top-[0vh] right-[5vw]"
              width={80}
              height={80}
              src="/assets/pants_love.jpg"
              alt=""
            />
            <Image
              className="absolute top-[15vh] right-[10vw]"
              width={70}
              height={70}
              src="/assets/remy.jpg"
              alt=""
            />
          </>
        )}
      </div>
      <div className="absolute top-[20vh] md:top-[40vh] lg:top-[30vh] text-white md:text-[7.5vw] xl:text-[8vw] uppercase mix-blend-difference">
        sois fier de tes sapes
      </div>
      <div className="w-full lg:px-40 flex flex-col items-start gap-20 mt-40">
        {/* <ScrollBanner /> */}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl uppercase font-medium">
            Créations disponibles
          </h1>
          <div className="flex items-center gap-4">
            <Link href="/shop" className="underline cursor-pointer">
              Voir tous les produits
            </Link>
            <IoIosArrowRoundForward />
          </div>
        </div>
        <div className="flex md:justify-center gap-4 w-full h-full overflow-x-auto">
          {data.map((item: Data) => (
            <ProductCard
              key={item.id}
              id={item.id}
              imageUrls={item.imageUrls[currentImageIndex]}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
