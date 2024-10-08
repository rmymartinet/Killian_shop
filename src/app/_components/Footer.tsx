import { FaArrowRight } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex flex-wrap gap-20 lg:justify-between h-screen bg-black text-white p-20 mt-40">
      <div className="flex flex-col justify-between gap-20">
        <div className="flex flex-col gap-5">
          <h2 className="text-5xl lg:text-8xl">Contactez-moi</h2>
          <span className=" text-2xl lg:text-5xl">killianpapail@gmail.com</span>
        </div>
        <div className="flex flex-col items-start gap-7">
          <span className="text-sm">
            Suivez notre newletter pour les nouveautés
          </span>
          <form
            className="flex flex-col justify-between gap-3 w-full"
            action="subtmit"
          >
            <div className="flex items-center justify-between gap-3">
              <input
                className="bg-inherit w-full"
                type="email"
                placeholder="Votre email"
              />
              <button type="submit">
                <FaArrowRight />
              </button>
            </div>
            <div className="w-full h-[1px] bg-slate-400"></div>
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-20 justify-between lg:gap-72">
        <div className="flex gap-10">
          <div>
            <span className="px-2 py-2 rounded-xl border-[1px] border-white font-semibold">
              Instagram
            </span>
          </div>
          <div>
            <span className="px-2 py-2 rounded-xl border-[1px] border-white font-semibold">
              Tiktok
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span>Expédition & Retour</span>
          <span>Tout droit réservé</span>
          <span>CGV</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
