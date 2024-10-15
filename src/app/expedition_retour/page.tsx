const LegalPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      {/* Livraisons & Retours */}
      <section>
        <h1 className="text-2xl font-bold text-center mb-6">
          LIVRAISONS & RETOURS
        </h1>

        <article className="mb-4">
          <p className="mt-2">
            Si vous souhaitez retourner un article, veuillez envoyer un message
            à{" "}
            <a
              href="https://www.instagram.com/sfdts.fr/"
              className="px-2 py-2 rounded-xl border-[1px] border-white font-semibold"
            >
              @SFDTS
            </a>
            en indiquant votre numéro de commande et la raison du retour. Merci
            de lire attentivement nos politiques ci-dessous avant de soumettre
            votre demande.
          </p>

          <h2 className="text-xl font-semibold mt-6">Politique de retour :</h2>
          <p className="mt-2">
            Les retours sont acceptés dans un délai de 14 jours après réception
            de la commande. Les articles doivent être renvoyés dans leur état
            d&apos;origine, non utilisés, avec l&apos;emballage et les
            étiquettes intactes. La facture d&apos;achat originale doit être
            jointe. Nous ne prenons pas en charge les frais de retour, sauf en
            cas d&apos;erreur de notre part.
          </p>

          <p className="mt-2">
            Les remboursements sont effectués dans les 14 jours suivant la
            réception des articles retournés, via le même moyen de paiement
            utilisé lors de la commande. Les frais d’expédition initiaux ne sont
            pas remboursables.
          </p>

          <p className="mt-2">
            Aucun retour ne sera accepté sans une communication préalable et un
            accord écrit de notre part. Veuillez vous assurer que tous les
            articles retournés sont correctement emballés et envoyés avec un
            numéro de suivi valide.
          </p>

          <h2 className="text-xl font-semibold mt-6">
            Retour d&apos;articles incorrects ou endommagés :
          </h2>
          <p className="mt-2">
            Si une erreur a été commise dans votre commande, ou si vous avez
            reçu des articles endommagés, nous rembourserons également les frais
            d&apos;expédition d’origine. Cela s&apos;applique uniquement aux
            produits incorrects ou défectueux.
          </p>
        </article>
      </section>
    </div>
  );
};

export default LegalPage;
