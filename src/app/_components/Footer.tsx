import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-wrap gap-20 lg:justify-between h-screen bg-black text-white p-10 md:p-20 mt-40 w-[100vdw]">
      <div className="flex flex-col justify-between gap-20">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl lg:text-8xl">Contactez-moi</h1>
          <a
            href="https://www.instagram.com/sfdts.fr/"
            className=" text-2xl lg:text-5xl"
          >
            @SFDTS
          </a>
        </div>
        {/* <div className="flex flex-col items-start gap-7">
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
        </div> */}
      </div>
      <div className="flex flex-col gap-20 justify-between lg:gap-72">
        <div className="flex gap-10">
          <div>
            <a
              href="https://www.instagram.com/sfdts.fr/"
              className="px-2 py-2 rounded-xl border-[1px] border-white font-semibold"
            >
              Instagram
            </a>
          </div>
          <div>
            <a
              href="https://www.tiktok.com/@sfdts.fr"
              className="px-2 py-2 rounded-xl border-[1px] border-white font-semibold"
            >
              Tiktok
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="expedition_retour" className="cursor-pointer">
            Expédition & Retour
          </Link>
          <Link href="/tout_droit_reserve" className="cursor-pointer">
            Tout droit réservé
          </Link>
          <Link href="conditions_general_de_vente" className="cursor-pointer">
            CGV
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
