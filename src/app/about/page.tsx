import Image from "next/image";
import { GiEcology } from "react-icons/gi";
import Footer from "../_components/Footer";

const About = () => {
  return (
    <>
      <div className="px-5 sm:px-10 md:px-20 mt-20 md:mt-40">
        <div className="p-5 sm:p-10 md:p-20 gap-10 sm:gap-20 md:gap-40 bg-white rounded-xl relative">
          <div className="absolute top-5 right-5 w-10 h-10 shadow-xl grid place-content-center rounded-full">
            <GiEcology size={30} />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-pretty">
            Acheter des vêtements issus de la mode responsable, c’est repenser
            notre façon de consommer. C’est un geste d’engagement envers la
            planète et les travailleurs, en choisissant des pièces produites de
            manière transparente, avec des matériaux recyclés. Porter ces
            vêtements permet de contribuer à un changement positif, tout en
            affirmant son propre style unique. C’est une façon d’être fier de
            son choix tout en ayant un impact concret sur l'environnement et la
            société.
          </h1>
        </div>

        <div className="p-5 sm:p-10 md:p-20 gap-4 rounded-xl relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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

        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 md:gap-40 h-auto md:h-[70vh] p-5 sm:p-10 md:p-20">
          <Image
            src={"/assets/images/about/fast_fashion.jpg"}
            width={700}
            height={700}
            alt=""
            layout="responsive"
            objectFit="cover"
            className="rounded-xl"
          />
          <p className="text-lg sm:text-xl text-pretty">
            La fast fashion, bien qu'attirante grâce à ses prix bas, impose un
            lourd tribut à l'environnement. En effet, cette industrie, deuxième
            source de pollution après celle du pétrole, contribue massivement
            aux émissions de carbone et à la dégradation des écosystèmes. Avec
            800 milliards de nouveaux vêtements produits chaque année, elle
            génère 10 % des émissions mondiales de carbone et altère les
            écosystèmes à chaque étape de sa chaîne d’approvisionnement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 md:gap-40 h-auto md:h-[70vh] p-5 sm:p-10 md:p-20">
          <p className="text-lg sm:text-xl text-pretty">
            Derrière la façade de la fast fashion se cache une réalité souvent
            méconnue : l'exploitation humaine. Cette industrie repose sur des
            conditions de travail inhumaines, parfois assimilables à
            l’esclavage, avec des employés – parfois même des enfants – soumis à
            des tâches exigeantes. La petite taille des mains des enfants les
            rend vulnérables et exploités dans des travaux minutieux comme la
            cueillette du coton.
          </p>
          <Image
            src={"/assets/images/about/enfant.jpg"}
            width={400}
            height={400}
            alt=""
            layout="responsive"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 md:gap-40 h-auto md:h-[70vh] p-5 sm:p-10 md:p-20">
          <Image
            src={"/assets/images/about/microplastique.jpg"}
            width={400}
            height={400}
            alt=""
            layout="responsive"
            objectFit="cover"
            className="rounded-xl"
          />
          <p className="text-lg sm:text-xl text-pretty">
            La production de vêtements en fibres synthétiques, bien qu’efficace
            en termes de coûts, est une source majeure de pollution des océans.
            Ces fibres synthétiques sont responsables de 35 % des
            microplastiques qui contaminent nos mers, affectant la faune marine
            et, par extension, la chaîne alimentaire.
          </p>
        </div>

        <div className="flex flex-col gap-10 p-5 sm:p-10 md:p-20 bg-white rounded-xl relative">
          <h1 className="text-4xl sm:text-5xl md:text-7xl uppercase text-pretty text-center">
            3 Millions de barils de pétrole
          </h1>
          <p className="text-lg sm:text-xl text-pretty text-center">
            Le coton, l’une des principales matières utilisées dans la fast
            fashion, est extrêmement gourmand en eau et nécessite l’utilisation
            de pesticides nocifs pour l’environnement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center h-auto md:h-[70vh] p-5 sm:p-10 md:p-20 gap-10 md:gap-40">
          <Image
            src={"/assets/logo_gif.gif"}
            width={400}
            height={400}
            alt=""
            layout="responsive"
            objectFit="cover"
            className="rounded-xl"
          />
          <p className="text-lg sm:text-xl text-pretty">
            En réponse à ces défis, certaines marques choisissent d’adopter une
            démarche éco-responsable en utilisant des tissus déjà produits,
            permettant de limiter la surproduction textile.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
