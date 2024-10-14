const Contact = () => {
  return (
    <div className="flex flex-col justify-between mt-40 md:p-10 lg:p-20">
      <h2 className="text-5xl md:text-6xl lg:text-8xl">Contactez-moi</h2>
      <div className="flex flex-col items-center md:items-start md:flex-row justify-between gap-72 mt-20">
        <div className="flex flex-col self-start gap-4">
          <span className="text-4xl">@sfdts</span>
          <div className="flex gap-2">
            <span className="p-2 rounded-xl border-[1px] h-max border-black cursor-pointer">
              Instagram
            </span>
            <span className="p-2 rounded-xl border-[1px] h-max border-black cursor-pointer">
              Tiktok
            </span>
          </div>
        </div>
        <div className="self-start md:self-end flex gap-40">
          <div className="flex flex-col gap-2">
            <span className="cursor-pointer">Expédition & Retour</span>
            <span className="cursor-pointer">Tout droit réservé</span>
            <span className="cursor-pointer">CGV</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
