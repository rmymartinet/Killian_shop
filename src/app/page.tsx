"use client";

import { Data } from "@/types/dataTypes";
import { useEffect, useRef, useState } from "react";
import ProductCard from "./_components/ProductCard";
import { useFilteredData } from "./hooks/useFilteredData";
import gsap from "gsap";
import Link from "next/link";
import useWindow from "./hooks/useWindow";
import Grid from "./_components/Grid";
import Flex from "./_components/Flex";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function Home() {
  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const { data } = useFilteredData("pants");
  const shopButtonRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);
  const { width } = useWindow();
  const [isHovered, setIsHovered] = useState(false);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(gridContainerRef.current, {
      x: 0,
      y: 0,
      opacity: 0,
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      const movementFactor = 0.05;

      gsap.to(gridContainerRef.current, {
        duration: 1,
        x: clientX * movementFactor,
        y: clientY * movementFactor,
        ease: "power1.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    gsap.set(shopButtonRef.current, {
      opacity: 0,
      y: 100,
    });

    gsap.set(titleRef.current, {
      opacity: 0,
      y: 100,
    });
    gsap
      .timeline()
      .to(
        ".circle-mask",
        {
          delay: 0.5,
          clipPath: "circle(0% at 100% 100%)",
          duration: 1,
          ease: "power3.inOut",
        },
        "-=0.5"
      )
      .to(
        shopButtonRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
        },
        "-=1"
      )
      .to(
        titleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
        },
        "-=0.9"
      )
      .to(
        gridContainerRef.current,
        {
          opacity: 1,
          duration: 1,
          ease: "power1.out",
        },
        "-=1"
      );
  }, []);

  useEffect(() => {
    if (gridContainerRef.current) {
      console.log(gridContainerRef.current);
      const handleScroll = () => {
        const getBottomShopButton =
          shopButtonRef.current?.getBoundingClientRect().bottom ?? 0;

        const getTopCollectionRef =
          collectionRef.current?.getBoundingClientRect().top ?? 0;

        gsap.set(shopButtonRef.current, {
          zIndex: getTopCollectionRef > getBottomShopButton ? 10 : -10,
        });

        gsap.to(gridContainerRef.current, {
          opacity: getTopCollectionRef > getBottomShopButton ? 1 : 0,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    gsap.timeline().to(arrowRef.current, {
      x: isHovered ? 10 : 0,
      duration: 0.5,
      ease: "power1.out",
    });
  }, [isHovered]);

  const handleOnMouseEnter = () => {
    setIsHovered(true);
    console.log(isHovered);
  };

  const handleOnMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section className="overflow-hidden w-screen">
      <div className="fixed -left-10 w-[120%] h-[120%] smoke-mask circle-mask"></div>
      <div className="w-full flex flex-col relative h-screen items-center justify-center">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center -z-30">
          <h1
            ref={titleRef}
            className="text-[15vw] w-full grid place-content-center  -z-10"
          >
            © S.F.D.T.S
          </h1>
        </div>
        <div
          ref={shopButtonRef}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          className="fixed top-[70%] left-1/2 -translate-x-1/2  -translate-y-1/2 w-full flex flex-col items-center overflow-hidden "
        >
          <Link
            href="/shop"
            className="px-4 py-2 bg-white flex items-center gap-4 rounded-xl cursor-pointer border-2 border-black z-10"
          >
            <h1 className="uppercase text-xl font-medium">
              Collection Disponible
            </h1>
            <div ref={arrowRef}>
              <IoIosArrowRoundForward className="text-3xl" />
            </div>
          </Link>
        </div>
        {width <= 498 ? (
          <Flex data={data} gridRef={gridContainerRef} />
        ) : (
          <Grid data={data} gridRef={gridContainerRef} />
        )}
      </div>
      <div ref={collectionRef} className="bg-white w-full z-50 p-4 md:p-8">
        <div className="flex flex-col gap-1">
          <Link href="/shop">Collection disponible [{data.length}]</Link>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-3 grid-flow-row justify-center flex-wrap gap-4 w-full px-8">
          {data.map((item: Data) => (
            <ProductCard
              key={item.id}
              id={item.id}
              imageUrls={item.imageUrls[0]}
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
