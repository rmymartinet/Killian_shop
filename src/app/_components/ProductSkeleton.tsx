import { DESKTOP_BREAKPOINT } from "@/utils/responsive";
import useWindow from "@/app/hooks/useWindow";

const ProductSkeleton = () => {
  const { width } = useWindow();

  return (
    <div className="mt-[20vh] flex justify-center w-full md:px-10 min-h-[100vh]">
      {/* Product Labels Skeleton (Desktop only) */}
      {width > DESKTOP_BREAKPOINT && (
        <div className="h-max flex flex-col gap-4 mt-20">
          <div className="w-40 h-40 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="w-40 h-40 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      )}

      {/* Main Product Container Skeleton */}
      <div className="flex flex-col lg:gap-10 bg-white lg:mx-10 rounded-xl shadow-lg md:pr-4">
        {/* Product Image Section */}
        <div className="flex justify-center">
          {/* Desktop Image */}
          {width > 768 && (
            <div className="flex flex-col justify-center items-center relative rounded-bl-xl rounded-tl-xl">
              <div className="p-4 rounded-xl">
                <div className="w-[400px] h-[400px] bg-gray-200 rounded animate-pulse mb-12 mr-14"></div>
              </div>
            </div>
          )}
          
          {/* Mobile/Tablet Carousel */}
          <div className="flex justify-center items-center relative">
            <div className="w-[400px] h-[400px] bg-gray-200 rounded animate-pulse"></div>
            {/* Navigation buttons skeleton */}
            <div className="absolute right-0 lg:-right-4 w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="absolute left-0 lg:-left-4 w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="p-2 md:p-10 lg:p-16 rounded-xl relative lg:mt-0 flex flex-col justify-between">
          <div className="flex flex-col gap-10">
            {/* Title and Price */}
            <div className="w-full flex justify-between">
              <div>
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="w-48 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col w-full lg:grid grid-cols-2 justify-between items-center gap-2">
              <div className="w-full h-10 bg-gray-200 rounded-[8px] animate-pulse"></div>
              <div className="w-full h-10 bg-gray-200 rounded-[8px] animate-pulse"></div>
            </div>
          </div>

          {/* Accordion Section */}
          <div className="mt-8 space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full h-12 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnail Images Skeleton (Desktop only) */}
      {width > DESKTOP_BREAKPOINT && (
        <div className="h-max mb-2 mt-20 w-max flex flex-col justify-center gap-4 bg-black rounded-xl py-2 px-16">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-[100px] h-[100px] bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSkeleton; 