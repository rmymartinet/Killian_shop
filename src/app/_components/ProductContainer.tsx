"use client";

import { Data } from "@/types/dataTypes";
import ProductGrid from "./ProductGrid";
import { useRef, useEffect, useState } from "react";
import { revealBlockAnimation } from "@/utils/Animation";

const ProductContainer = ({data}: {data: Data[]}) => {
  const productContainerRef = useRef<HTMLDivElement>(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  revealBlockAnimation({ref: productContainerRef, delay: 0.5});

  // Animation du compteur quand data change
  useEffect(() => {
    if (data) {
      const targetCount = data.length;
      
      // Animation de transition
      setIsAnimating(true);
      const duration = 800; // 0.8 seconde
      const steps = 15;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const currentCount = Math.round(targetCount * progress);
        setDisplayCount(currentCount);
        
        if (currentStep >= steps) {
          setDisplayCount(targetCount);
          setIsAnimating(false);
          clearInterval(interval);
        }
      }, stepDuration);
      
      return () => clearInterval(interval);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-4 md:p-8 mt-10 md:mt-0 z-50">
        <span ref={productContainerRef} className="text-sm text-black pl-4 md:pl-0">
          Items disponibles [ {isAnimating ? displayCount : (data ? data.length : "...")} ]
        </span>
        <ProductGrid data={data} />
    </div>
  );
};

export default ProductContainer;