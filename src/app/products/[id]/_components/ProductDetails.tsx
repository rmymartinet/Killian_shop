import TransitionLink from "@/app/_components/TransitionLinks";
import { useCart } from "@/app/context/CartContext";
import { ProductDetailsProps } from "@/types/dataTypes";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Accordion from "./Accordion";

const PorductDetails = ({
  datas,
  setIsShoppingOpen,
  filteredDataById,
  addToCart,
}: ProductDetailsProps) => {
  const { cart } = useCart();

  const [isProductInCart, setIsProductInCart] = useState(false);
  const [isEnoughtStock, setIsEnoughtStock] = useState(false);

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
      console.log("Stock insuffisant");
    }
    console.log(isEnoughtStock);
  }, [filteredDataById, isEnoughtStock]);

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
              setIsShoppingOpen(true);
              if (!isProductInCart) {
                // On ajoute le produit au panier seulement s'il n'y est pas déjà
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
              isProductInCart || isEnoughtStock === false ? "opacity-40" : ""
            }`}
          >
            <span>Ajouter au panier</span>
          </button>
          <TransitionLink href={"/checkout"}>
            <div
              onClick={() => {
                setIsShoppingOpen(false);
                if (filteredDataById.length > 0) {
                  addToCart({ ...filteredDataById[0] });
                }
              }}
              className="rounded-[8px] bg-black text-white py-2 grid place-content-center font-semibold w-full"
            >
              <span>Acheter maintenant</span>
            </div>
          </TransitionLink>
        </div>
      </div>

      <Accordion data={filteredDataById} />
    </div>
  );
};

export default PorductDetails;
