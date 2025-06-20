import { useCart } from "@/app/context/CartContext";
import { ProductDetailsProps } from "@/types/dataTypes";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Accordion from "../../../_components/Accordion";
import Link from "next/link";
import { useAddToCart } from "@/app/hooks/useAddToCart";

const PorductDetails = ({
  datas,
  filteredDataById,
}: ProductDetailsProps) => {
  const { cart } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [isEnoughtStock, setIsEnoughtStock] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const addToCart = useAddToCart();

  useEffect(() => {
    if (filteredDataById.length > 0) {
      const product = { ...filteredDataById[0] };
      const isExistingProduct = cart.findIndex(
        (item) => item.id === product.id
      );
      setIsProductInCart(isExistingProduct >= 0);
    }
  }, [filteredDataById, cart]);

  useEffect(() => {
    if (
      filteredDataById.length > 0 &&
      (filteredDataById[0].quantity ?? 0) > 0
    ) {
      setIsEnoughtStock(true);
    }
  }, [filteredDataById, isEnoughtStock]);

  const isStringOrNumber =
    filteredDataById[0] && (filteredDataById[0]?.waistline ?? "").length > 5;

  const accordionData = [
    {
      title: "Longueur",
      description: `Le pantalon mesure : ${filteredDataById[0]?.length} cm`,
    },
    {
      title: "Tour de taille",
      description: `${filteredDataById[0]?.waistline} ${
        isStringOrNumber ? "" : "cm"
      }`,
    },
    {
      title: "Poids",
      description: `Le pantalon à un poids de ${filteredDataById[0]?.weight} g`,
    },
    {
      title: "Matériaux",
      description: `${filteredDataById[0]?.material}`,
    },
  ];

  const handleToggleAccordion = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <div className="p-2 md:p-10 lg:p-16 rounded-xl relative lg:mt-0 flex flex-col justify-between">
      <div className="flex flex-col gap-10">
        <div className="w-full flex justify-between">
          <div>
            <span className="uppercase text-slate-400 text-sm md:text-base">
              Pantalon
            </span>
            <h1 className="text-2xl lg:text-4xl">{datas?.title}</h1>
          </div>
          <span className="text-lg font-semibold">{datas?.price},00 €</span>
        </div>
        <p className="text-sm font-medium">
          Chaque pièce est unique, assemblée à la main dans une démarche
          écoresponsable, à partir de matériaux recyclés pour un style 100 %
          original.
        </p>
        <div className="flex flex-col w-full lg:grid grid-cols-2 justify-between items-center gap-2">
          <button
            disabled={isEnoughtStock === false}
            onClick={() => {
              if (!isProductInCart) {
                addToCart({ ...filteredDataById[0] });
              } else {
                Swal.fire({
                  title: "Erreur!",
                  text: "Le produit est déjà dans votre panier",
                  icon: "error",
                  confirmButtonText: "Cool",
                });
              }
            }}
            className={`cursor-pointer rounded-[8px] bg-black text-white py-2 grid place-content-center font-semibold w-full ${
              isEnoughtStock === false ? "opacity-40" : ""
            }`}
          >
            <span>Ajouter au panier</span>
          </button>
          <Link href={"/choose-auth"} className="w-full">
            <div
              onClick={() => {
                if (filteredDataById.length > 0) {
                  addToCart({ ...filteredDataById[0] });
                }
              }}
              className="rounded-[8px] bg-black text-white py-2 grid place-content-center font-semibold w-full "
            >
              <span>Acheter maintenant</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="mt-8">
        {filteredDataById.length > 0 &&
          accordionData.map((data, index) => (
            <Accordion
              key={index}
              isOpen={activeIndex === index}
              title={data.title}
              description={data.description}
              onClick={() => handleToggleAccordion(index)}
            />
          ))}
      </div>
    </div>
  );
};

export default PorductDetails;
