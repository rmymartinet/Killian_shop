import Link from "next/link";

const Contact = () => {
  return (
    <div className="flex flex-col justify-between mt-40 md:p-10 lg:p-20">
      <h2 className="text-5xl md:text-6xl lg:text-8xl">Contactez-moi</h2>
      <div className="flex flex-col items-center md:items-start md:flex-row justify-between gap-72 mt-20">
        <div className="flex flex-col self-start gap-4">
          <a href="https://www.instagram.com/sfdts.fr/" className="text-4xl">
            @SFDTS.fr
          </a>
          <div className="flex gap-2">
            <a
              href="https://www.instagram.com/sfdts.fr/"
              className="p-2 rounded-xl border-[1px] h-max border-black cursor-pointer"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@sfdts.fr"
              className="p-2 rounded-xl border-[1px] h-max border-black cursor-pointer"
            >
              Tiktok
            </a>
          </div>
        </div>
        <div className="self-start md:self-end flex gap-40">
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
      </div>
    </div>
  );
};

export default Contact;
