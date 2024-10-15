const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        CONDITIONS GÉNÉRALES DE VENTE
      </h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">Article 1 - Objet</h2>
          <p>
            Les présentes conditions générales de vente régissent l’ensemble des
            ventes effectuées sur le site www.sfdts.com. Elles définissent les
            droits et obligations des parties dans le cadre de la vente de biens
            proposés par SFDTS. Pour toute question, veuillez nous contacter via
            mon compte
            <a
              href="https://www.instagram.com/sfdts.fr/"
              className="px-2 py-2 rounded-xl border-[1px] border-white font-semibold"
            >
              @SFDTS
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Article 2 - Prix</h2>
          <p>
            Les prix des produits sont affichés en euros, toutes taxes comprises
            (TTC), y compris la TVA applicable au jour de la commande, sauf
            mention contraire. Les frais de traitement, d’expédition ou les
            droits de douane restent à la charge du client. Les produits restent
            la propriété de Parur S.A.S jusqu’au paiement complet du prix.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Article 3 - Commandes</h2>
          <p>
            Toute commande effectuée sur www.parurfrance.com est définitive et
            implique l’acceptation sans réserve des présentes conditions
            générales de vente. Parur S.A.S se réserve le droit d’annuler ou de
            refuser toute commande en cas de problème lié au paiement ou à
            l’approvisionnement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Article 4 - Validation de la commande
          </h2>
          <p>
            La confirmation d’une commande vaut acceptation des présentes
            conditions générales de vente. Les informations contractuelles sont
            présentées en français et feront l’objet d’une confirmation au
            moment de la validation de la commande.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Article 5 - Paiement</h2>
          <p>
            Le paiement s&apos;effectue par carte bancaire ou via PayPal au
            moment de la commande. Le débit est effectué à la confirmation de la
            commande.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Article 6 - Renonciation au droit de rétractation
          </h2>
          <p>
            Conformément à l&apos;article L121-21-8 du Code de la consommation,
            le droit de rétractation ne s&apos;applique pas aux produits
            personnalisés ou aux services numériques immédiatement accessibles
            après paiement. En confirmant votre commande, vous renoncez
            expressément à ce droit de rétractation, sachant que la prestation
            commence immédiatement après la validation du paiement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Article 7 - Garantie légale et vices cachés
          </h2>
          <p>
            Les produits bénéficient de la garantie légale de conformité
            (articles L217-4 et suivants du Code de la consommation) et de la
            garantie contre les vices cachés (articles 1641 et suivants du Code
            civil). En cas de non-conformité ou de vice caché, le client peut
            obtenir une réparation, un échange ou un remboursement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Article 8 - Livraison</h2>
          <p>
            Les produits sont livrés à l’adresse indiquée par le client lors de
            la commande. En cas de retard de livraison, le client sera informé
            par e-mail. Les risques de perte ou d’endommagement des produits
            sont transférés au client dès qu’il prend physiquement possession
            des produits.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Article 9 - Retour et remboursement
          </h2>
          <p>
            En cas de livraison d’un produit défectueux, le client dispose de 3
            jours pour signaler le défaut à Parur S.A.S et retourner le produit.
            Les frais de retour sont à la charge du client, sauf en cas de
            défaut ou vice caché reconnu par Parur S.A.S.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Article 10 - Droit applicable et litiges
          </h2>
          <p>
            Les présentes conditions générales de vente sont soumises au droit
            français. En cas de litige, les tribunaux français seront seuls
            compétents.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Article 11 - Propriété intellectuelle
          </h2>
          <p>
            Tous les éléments du site www.sfdts.com sont protégés par des droits
            de propriété intellectuelle appartenant à SFDTS. Toute reproduction,
            utilisation ou diffusion sans autorisation est strictement
            interdite.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Article 12 - Données personnelles
          </h2>
          <p>
            Les informations collectées sont nécessaires à la gestion des
            commandes et au suivi de la relation client. Conformément à la loi
            Informatique et Libertés, le client dispose d’un droit d’accès, de
            rectification et d’opposition aux données personnelles le
            concernant.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
