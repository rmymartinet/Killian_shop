import { useRef } from "react";
import { useRevealBlockAnimation } from "@/utils/Animation";

const ShopSkeleton = () => {
  const shopSkeletonRef = useRef<HTMLDivElement>(null);
  useRevealBlockAnimation({ref: shopSkeletonRef, delay: 0.5});

  return (
    <section className="mt-[20vh] bg-white min-h-screen" ref={shopSkeletonRef}>
      <div className="mx-auto md:px-4">
        {/* Breadcrumb Skeleton */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6 px-4 md:px-0">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-3 h-3 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
        </nav>

        {/* ShopFilters Skeleton */}
        <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-6 md:mb-8 px-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-20 h-10 md:w-24 md:h-12 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>

        {/* ProductContainer Skeleton */}
        <div className="flex flex-col gap-4 md:p-8 mt-10 md:mt-0 z-50 bg-white">
          {/* Items count skeleton */}
          <div className="text-sm text-black pl-4 md:pl-0">
            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* ProductGrid Skeleton */}
          <div className="flex flex-col lg:grid lg:grid-cols-3 grid-flow-row justify-center gap-4 w-full px-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col gap-4 h-full w-full">
                {/* ProductCard Skeleton */}
                <div className="p-6 bg-[#fafafa] relative overflow-hidden">
                  {/* Image skeleton */}
                  <div className="w-full h-full relative aspect-[4/5] bg-gray-200 rounded animate-pulse"></div>
                  
                  {/* Mobile hint skeleton */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-300 rounded-lg animate-pulse"></div>
                  
                  {/* View indicator skeleton */}
                  <div className="absolute bottom-2 right-2 w-16 h-6 bg-gray-300 rounded animate-pulse"></div>
                </div>
                
                {/* Product details skeleton */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between md:flex-col md:pl-6 md:pb-6">
                    <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  {/* Mobile button skeleton */}
                  <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSkeleton; 