import { Data } from "@/types/dataTypes";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useHomeReload } from "@/app/hooks/useHomeReload";

const Grid = ({
  data,
  gridRef,
}: {
  data: Data[];
  gridRef: React.RefObject<HTMLDivElement>;
}) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [visibleGridLines, setVisibleGridLines] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const shouldAnimate = useHomeReload();

  // Images du loader pour préchargement et animation
  const loaderImages = [
    "/assets/images/pants.png",
    "/assets/images/coeur.png",
    "/assets/images/remy.jpg",
    "/assets/images/zoom.png",
    "/assets/images/profile_erwan.jpg", 
    "/assets/images/erwan_twins.jpg",
  ];

  // Positions de grille cibles (commencent à 1, pas à 0 !)
  const gridPositions = [
    { col: 6, row: 5 },
    { col: 2, row: 4 },
    { col: 3, row: 5 },
    { col: 6, row: 1 },
    { col: 2, row: 1 },
    { col: 8, row: 4 },
  ];

  // Précharger les images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = loaderImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Erreur de préchargement:', error);
        setImagesLoaded(true); // Continuer même en cas d'erreur
      }
    };

    preloadImages();
  }, []);

  // Étape 3: Animation progressive des lignes de grille (après FLIP)
  useEffect(() => {
    if (shouldAnimate && imagesLoaded && !hasAnimated) {
      const totalGridCells = 8 * 6; // 48 cellules
      let intervalId: NodeJS.Timeout;
      
      const timeoutId = setTimeout(() => {
        intervalId = setInterval(() => {
          setVisibleGridLines((prev) => {
            if (prev < totalGridCells) {
              return prev + 1;
            } else {
              clearInterval(intervalId);
              setHasAnimated(true); // Marquer comme animé
              return prev;
            }
          });
        }, 15); // Plus rapide pour un effet plus fluide
      }, 1000);
      
      return () => {
        clearTimeout(timeoutId);
        if (intervalId) clearInterval(intervalId);
      };
    } else if (!shouldAnimate && imagesLoaded) {
      // Si on n'est pas sur la home, afficher toutes les lignes immédiatement
      setVisibleGridLines(8 * 6);
    }
  }, [shouldAnimate, imagesLoaded, hasAnimated]);

  return (
    <div
      ref={gridRef}
      className="fixed -top-[10%]  -left-[20%] w-[120%] h-screen md:h-[120%] z-10 grid grid-cols-8 grid-rows-6 border-dashed border border-gray-200"
    >
      {Array.from({ length: 8 * 6 }).map((_, index) => (
        <div
          key={index}
          className={`border border-dashed border-gray-200 transition-all duration-1000 ease-out ${
            index < visibleGridLines ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        ></div>
      ))}
      
  
      
      {/* Images finales dans la grille (toujours visibles après animation) */}
        {(!shouldAnimate || imagesLoaded) && loaderImages.map((image, index) => {
        const pos = gridPositions[index];
        return (
          <div
            key={`final-${index}`}
            className="col-start-1 p-2 row-start-1 border border-dashed border-gray-200 h-full justify-between flex flex-col col-span-1 row-span-1"
            style={{
              gridColumn: pos.col,
              gridRow: pos.row,
            }}
          >
            <Image
              alt=""
              src={image}
              width={300}
              height={300}
              className="object-contain w-full h-3/4"
            />
          </div>
        );
      })}
      
      <div className="col-start-4 p-2 row-start-2 border border-dashed border-gray-200 h-full justify-between flex flex-col col-span-1 row-span-1">
        <p className="font-light text-[0.5rem]">100% unique</p>
        <p className="font-light text-[0.5rem]">100% recyclable</p>
        <p className="font-light text-[0.5rem]">100% unique</p>
        <p className="font-light text-[0.5rem]">100% recyclable</p>
        <p className="font-light text-[0.5rem]">100% unique</p>
        <p className="font-light text-[0.5rem]">100% recyclable</p>
        <p className="font-light text-[0.5rem]">100% unique</p>
        <p className="font-light text-[0.5rem]">100% recyclable</p>
      </div>
      {data[0] && (
        <div className="col-start-1 p-2 row-start-3 border border-dashed border-gray-200 h-full justify-between flex flex-col col-span-1 row-span-1">
          <Image
            alt=""
            src={data[2]?.imageDetails ? data[2].imageDetails[1] : ""}
            width={300}
            height={300}
            className="object-contain w-full h-3/4"
          />
          <div>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[0].title}
            </p>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[0].material}
            </p>
          </div>
        </div>
      )}
      {data[0] && (
        <div className="col-start-2 p-2 row-start-4 border border-dashed border-gray-200 h-full justify-between flex flex-col col-span-1 row-span-1">
          <Image
            alt=""
            src={data[0]?.imageDetails ? data[0].imageDetails[0] : ""}
            width={300}
            height={300}
            className="object-contain w-full h-3/4"
          />
          <div>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[0].title}
            </p>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[0].material}
            </p>
          </div>
        </div>
      )}
      {data[0] && (
        <div className="col-start-3 p-2 row-start-5 border border-dashed border-gray-200 h-full justify-between flex flex-col col-span-1 row-span-1">
          <Image
            alt=""
            src={data[0]?.imageDetails ? data[0].imageDetails[3] : ""}
            width={300}
            height={300}
            className="object-contain w-full h-3/4"
          />
          <div>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[0].title}
            </p>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[0].material}
            </p>
          </div>
        </div>
      )}
      {data[1] && (
        <div className="col-start-6 p-2 row-start-1 border border-dashed border-gray-200 h-full justify-between flex flex-col col-span-1 row-span-1">
          <Image
            alt=""
            src={data[1]?.imageDetails ? data[1].imageDetails[1] : ""}
            width={300}
            height={300}
            className="object-contain w-full h-3/4"
          />
          <div>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[1].title}
            </p>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[1].material}
            </p>
          </div>
        </div>
      )}
      {data[1] && (
        <div className="col-start-2 p-2 row-start-1 border border-dashed border-gray-200 h-full justify-between flex flex-col col-span-1 row-span-1">
          <Image
            alt=""
            src={data[1]?.imageDetails ? data[1].imageDetails[2] : ""}
            width={300}
            height={300}
            className="object-contain w-full h-3/4"
          />
          <div>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[1].title}
            </p>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[1].material}
            </p>
          </div>
        </div>
      )}
      {data[2] && (
        <div className="col-start-8 p-2 row-start-4 border border-dashed border-gray-200 h-full justify-between flex flex-col col-span-1 row-span-1">
          <Image
            alt=""
            src={data[2]?.imageDetails ? data[2].imageDetails[2] : ""}
            width={300}
            height={300}
            className="object-contain w-full h-3/4"
          />
          <div>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[1].title}
            </p>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[1].material}
            </p>
          </div>
        </div>
      )}
      {data[2] && (
        <div className="col-start-6 p-2 row-start-5 border border-dashed border-gray-200 h-full justify-between flex flex-col col-span-1 row-span-1">
          <Image
            alt=""
            src={data[2]?.imageDetails ? data[2].imageDetails[0] : ""}
            width={300}
            height={300}
            className="object-contain w-full h-3/4"
          />
          <div>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[1].title}
            </p>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[1].material}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grid;
