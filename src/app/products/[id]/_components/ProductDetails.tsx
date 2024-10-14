import TransitionLink from "@/app/_components/TransitionLinks";
import { ProductDetailsProps } from "@/types/dataTypes";
import Accordion from "./Accordion";

const PorductDetails = ({
  datas,
  setIsShoppingOpen,
  filteredDataById,
  addToCart,
}: ProductDetailsProps) => {
  return (
    <div className="p-10 lg:p-16 rounded-xl relative lg:mt-0 flex flex-col justify-between">
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
            onClick={() => {
              setIsShoppingOpen(true);
              if (filteredDataById.length > 0) {
                addToCart({ ...filteredDataById[0], quantity: 1 });
              }
            }}
            className="cursor-pointer rounded-[8px] bg-black text-white py-2 grid place-content-center font-semibold w-full"
          >
            <span>Ajouter au panier</span>
          </button>
          <TransitionLink href={"/checkout"}>
            <div
              onClick={() => {
                setIsShoppingOpen(true);
                if (filteredDataById.length > 0) {
                  addToCart({ ...filteredDataById[0], quantity: 1 });
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
