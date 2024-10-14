import Image from "next/image";

const EcologyContainer = () => {
  return (
    <section>
      <div className="gap-4 rounded-xl relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-xl p-10 grid place-content-center">
          <Image
            src={"/assets/logo_gif.gif"}
            width={400}
            height={400}
            alt=""
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="bg-white rounded-xl p-5 text-center grid place-content-center">
          <div className="text-2xl sm:text-3xl font-semibold">
            <h1>800 milliards pollution</h1>
            <h1>93 milliards pesticides</h1>
            <h1>10 % émissions</h1>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 text-center grid place-content-center">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Exploitation, esclavage, enfants travailleurs
          </h1>
        </div>
        <div className="bg-white rounded-xl p-5 text-center grid place-content-center">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            35 % microplastiques
          </h1>
          <span>Ils contaminent nos mers, nos oceans</span>
        </div>
        <div className="bg-white rounded-xl p-5 text-center grid place-content-center">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            3 millions barils de pétrole, coton
          </h1>
        </div>
      </div>
    </section>
  );
};

export default EcologyContainer;
