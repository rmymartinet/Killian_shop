const About = () => {
  return (
    <section className="relative">
      <video
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        muted
        loop
        src="/assets/videos/banner.mp4"
      />
      <div className="flex flex-col mt-20 md:grid md:grid-cols-2 md:gap-5 lg:gap-10">
        <p className="text-pretty p-2 md:px-2 lg:px-10">
          Un jour, j&apos;ai entendu une grand-mère dire : &quot;Ce qui coûte
          très peu cher aujourd&apos;hui, te coûtera plus cher demain...&quot;
          La fast fashion, malheureusement leader du marché du textile grâce à
          ses prix toujours plus attrayants, coûte en réalité bien plus cher que
          ce que l&apos;on pense. Ce coût, absent des étiquettes, est payé par
          l&apos;environnement, les employés (ou les esclaves devrais-je dire),
          qui sont souvent des enfants utilisés pour la petite taille de leurs
          mains. Les enfants sont partiellement aptes à effectuer des tâches
          exigeantes nécessitant de la précision et de la délicatesse telles que
          la cueillette du coton, ce qui les rend très vulnérables. Cette
          industrie gigantesque va également à l&apos;encontre d&apos;une
          production respectueuse de l&apos;environnement (industrie la plus
          polluante derrière l&apos;industrie pétrolière, UN News, 2019). Avec
          la production de 800 milliards de nouveaux vêtements par an, elle
          représente 10 % des émissions mondiales de carbone et engendre des
          nuisances à chaque étape de sa chaîne d&apos;approvisionnement
          (Baptist World Aid Australia, 2019). Les vêtements sont généralement
          fabriqués en coton ou en fibres synthétiques : le premier est
          extrêmement gourmand en eau et nécessite l&apos;utilisation de
          pesticides très puissants, tandis que les seconds sont responsables de
          35 % des microplastiques qui polluent nos océans (UNDP, 2019).
        </p>

        <p className="text-pretty p-2 md:px-2 lg:px-10">
          La production de vêtements représente 93 milliards de mètres cubes
          d&apos;eau par an et trois millions de barils de pétrole (UN News,
          2019). Nous sommes déjà tous au courant de ces problématiques (du
          moins je l&apos;espère) mais il est difficile de mesurer le réel
          impact sur la planète et la vie de millions de personnes que peut
          avoir l&apos;achat d&apos;un vêtement à un prix très accessible.
          C&apos;est pourquoi nous avons décidé de créer des pièces 100%
          recyclées avec des tissus déjà produits. En plus d&apos;une démarche
          éco-responsable, ce sont des pièces 100% uniques et le résultat de
          chaque pièce est le fruit d&apos;une réflexion longue et d&apos;un
          travail méticuleux, réalisé par des mains d&apos;adultes dans des
          conditions de travail saines, rémunérées à une valeur juste. Acheter
          une pièce, c&apos;est repenser notre mode de consommation des
          vêtements. L&apos;idée de ces pièces est d&apos;être 100% transparent
          et de pouvoir être fier de soi en les portant en pouvant se dire
          qu&apos;on tente de changer les choses, tout en étant unique et frais.
        </p>
      </div>
    </section>
  );
};

export default About;
