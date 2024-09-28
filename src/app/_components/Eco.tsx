import Card from "./Card";

const Eco = () => {
  return (
    <div className="flex flex-col items-center mt-72">
      <h1 className="text-5xl lg:text-8xl uppercase">Conception</h1>
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:place-items-center gap-10  pr-10 pl-10 mt-10 lg:mt-40">
        {/* Banner*/}
        <div className="w-full rounded-xl h-[50vh]">
          <video
            className="w-full h-full object-cover rounded-2xl"
            autoPlay
            playsInline
            muted
            loop
            src="/assets/videos/banner.mp4"
          ></video>
        </div>
        {/*Card container*/}
        <div className="flex flex-col items-center gap-20">
          <Card
            title="Recherche de matière"
            description="La première étape du processus de création consiste à déambuler librement dans des marchés de seconde main et de se laisser surprendre par des tissus originaux qui méritent d'avoir une seconde vie. Ils sont ensuite lavés et repassés."
          />
          <Card
            title="Imagination"
            description="Après avoir acheté plusieurs pièces, nous imaginons de multiples
      assemblages avec différentes coupes, différentes matières pour créer
      une pièce finalement unique, originale, durable et éthique."
          />

          <Card
            title="Réalisation"
            description="Tout prend forme lors de cette dernière étape. Après avoir
      conceptualisé une pièce, il faut passer à une découpe minutieuse et
      précise du textile, réaliser les bonnes mesures, les ajustements
      nécessaires pour obtenir les bonnes dimensions et enfin assembler
      les éléments avec des coutures solides. C'est un travail de longue
      haleine, dont nous sommes extrêmement fiers lorsque le résultat est
      à la hauteur des nos imaginations et qu'on souhaite partager avec
      vous."
          />
        </div>
      </div>
    </div>
  );
};

export default Eco;
