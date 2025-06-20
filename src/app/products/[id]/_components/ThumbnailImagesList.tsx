import { ThumbnailImagesListProps } from "@/types/dataTypes";
import Image from "next/image";

const ThumbnailImagesList = ({
  data,
  refs,
  currentImageIndex,
  setCurrentImageIndex,
}: ThumbnailImagesListProps) => {

  console.log("DATA",data)
  console.log("imageDetails brutes:", data[0]?.imageDetails)
  
  // Créer un tableau des images valides avec leurs indices originaux
  const validImages = Array.isArray(data[0]?.imageDetails) 
    ? data[0].imageDetails
        .map((imageUrl: string, originalIndex: number) => ({ imageUrl, originalIndex }))
        .filter(({ imageUrl }: { imageUrl: string; originalIndex: number }) => 
          imageUrl && typeof imageUrl === 'string' && imageUrl.trim() !== ''
        )
    : [];

  console.log("Images valides après filtrage:", validImages)
  console.log("Nombre d'images valides:", validImages.length)

  return (
    <div className="h-max mb-2 mt-20 w-max flex flex-col justify-center gap-4 bg-black rounded-xl py-2 px-16 ">
      {validImages.map(({ imageUrl, originalIndex }: { imageUrl: string; originalIndex: number }, filteredIndex: number) => (
        <div
          ref={refs[originalIndex]}
          key={originalIndex}
          className={
            currentImageIndex === originalIndex ? "opacity-100" : "opacity-40"
          }
        >
          <Image
            src={imageUrl}
            onClick={() => setCurrentImageIndex(originalIndex)}
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