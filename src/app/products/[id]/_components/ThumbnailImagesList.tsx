import { ThumbnailImagesListProps } from "@/types/dataTypes";
import Image from "next/image";

const ThumbnailImagesList = ({
  data,
  refs,
  currentImageIndex,
  setCurrentImageIndex,
}: ThumbnailImagesListProps) => {
  return (
    <div className="h-max mb-2 mt-20 w-max flex flex-col justify-center gap-4 bg-black rounded-xl py-2 px-16 ">
      {Array.isArray(data[0]?.imageDetails) &&
        data[0]?.imageDetails.map((imageUrl: string, index: number) => (
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
        ))}
    </div>
  );
};

export default ThumbnailImagesList;