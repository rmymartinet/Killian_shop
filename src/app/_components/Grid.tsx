import { Data } from "@/types/dataTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useHomeReload } from "@/app/hooks/useHomeReload";

// Fonction d'aide pour récupérer une image de manière sûre
const getSafeImage = (data: Data[], dataIndex: number, imageIndex: number): string => {
  return data?.[dataIndex]?.imageDetails?.[imageIndex] || "";
};

const Grid = ({
  data,
  gridRef,
}: {
  data: Data[];
  gridRef: React.RefObject<HTMLDivElement>;
}) => {
  const [visibleGridLines, setVisibleGridLines] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const shouldAnimate = useHomeReload();

  // Configuration pour le placement dynamique des images
  const gridItems = [
    { dataIndex: 2, imageIndex: 1, col: 1, row: 3 },
    { dataIndex: 0, imageIndex: 0, col: 2, row: 4 },
    { dataIndex: 0, imageIndex: 2, col: 3, row: 5 },
    { dataIndex: 1, imageIndex: 1, col: 6, row: 1 },
    { dataIndex: 1, imageIndex: 2, col: 2, row: 1 },
    { dataIndex: 2, imageIndex: 2, col: 8, row: 4 },
    { dataIndex: 2, imageIndex: 0, col: 6, row: 5 },
  ];

  // Animation progressive des lignes de grille
  useEffect(() => {
    if (shouldAnimate && !hasAnimated) {
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
    } else if (!shouldAnimate) {
      // Si on n'est pas sur la home, afficher toutes les lignes immédiatement
      setVisibleGridLines(8 * 6);
    }
  }, [shouldAnimate, hasAnimated]);

  return (
    <div
      ref={gridRef}
      className="fixed -top-[10%]  -left-[20%] w-[120%] h-screen md:h-[120%] z-10 grid grid-cols-8 grid-rows-6 border-dashed border border-gray-200"
    >
      {/* Rendu des lignes de la grille */}
      {Array.from({ length: 8 * 6 }).map((_, index) => (
        <div
          key={index}
          className={`border border-dashed border-gray-200 transition-all duration-1000 ease-out ${
            index < visibleGridLines ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        ></div>
      ))}
      
      {/* Rendu des éléments statiques (textes) */}
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

      {/* Rendu dynamique des images de produits */}
      {gridItems.map((item, index) => {
        // On s'assure que le produit existe avant de tenter de l'afficher
        if (!data[item.dataIndex]) {
          return null;
        }

        return (
          <div
            key={index}
            className="p-2 border border-dashed border-gray-200 h-full justify-between flex flex-col col-span-1 row-span-1"
            style={{ gridColumn: item.col, gridRow: item.row }}
          >
            <Image
              alt=""
              src={getSafeImage(data, item.dataIndex, item.imageIndex)}
              width={300}
              height={300}
              className="object-contain w-full h-3/4"
            />
            <div>
              <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
                {data[item.dataIndex].title}
              </p>
              <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
                {data[item.dataIndex].material}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
