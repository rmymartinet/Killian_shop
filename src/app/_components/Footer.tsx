import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col-reverse md:flex-row gap-20 lg:justify-between md:items-end bg-white px-4 md:px-10 py-5">
      <div className="flex flex-col  gap-4">
        <a
          href="https://www.instagram.com/sfdts.fr/"
          className=" text-2xl lg:text-4xl"
        >
          @contact
        </a>
        <Link href="/tout_droit_reserve" className="cursor-pointer">
          © 2025 SFDTS. All Rights Reserved.
        </Link>
      </div>
      <div className="flex flex-col">
        <Link href="conditions_general_de_vente" className="cursor-pointer">
          CGV
        </Link>
        <Link href="expedition_retour" className="cursor-pointer">
          Expédition & Retour
        </Link>
      </div>
    </footer>
  );
};
export default Footer;
