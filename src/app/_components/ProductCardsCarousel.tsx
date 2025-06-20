import ProductCard from "@/app/_components/ProductCard";
import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Data } from "@/types/dataTypes";

interface ProductCardsCarouselProps {
  products: Data[];
}

const getVisibleCount = (width: number) => {
  if (width < 768) return 1;
  if (width < 1024) return 2;
  return 3;
};

export default function ProductCardsCarousel({ products }: ProductCardsCarouselProps) {
  const [start, setStart] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount(window.innerWidth));
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxStart = Math.max(0, products.length - visibleCount);

  const goPrev = () => setStart((s) => Math.max(0, s - 1));
  const goNext = () => setStart((s) => Math.min(maxStart, s + 1));

  if (products.length <= visibleCount) {
    return (
      <div className="flex flex-1 justify-center items-stretch gap-4">
        {products.map((item, idx) => (
          <div
            key={item.id}
            className="flex-shrink-0 gap-4 flex"
            style={{ width: "320px", maxWidth: "90vw" }}
          >
            <ProductCard
              id={item.id}
              imageFace={item.imageFace ?? ""}
              imageEnsemble={item.imageEnsemble}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
              index={idx}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="flex items-stretch w-full">
        <button
          onClick={goPrev}
          disabled={start === 0}
          className="p-2 text-2xl font-bold text-gray-500 hover:text-black disabled:opacity-30"
        >
          <IoIosArrowBack />
        </button>
        <div className="flex flex-1 justify-center gap-6 overflow-hidden">
          {products.slice(start, start + visibleCount).map((item, idx) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[320px] flex"
            >
              <ProductCard
                id={item.id}
                imageFace={item.imageFace ?? ""}
                imageEnsemble={item.imageEnsemble}
                title={item.title}
                price={item.price}
                quantity={item.quantity}
                index={start + idx}
              />
            </div>
          ))}
        </div>
        <button
          onClick={goNext}
          disabled={start >= maxStart}
          className="p-2 text-2xl font-bold text-gray-500 hover:text-black disabled:opacity-30"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}