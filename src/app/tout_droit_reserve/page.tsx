const LegalPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="p-4 text-center">
        <h1 className="text-2xl font-bold">Mentions Légales</h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <section>
          <h2 className="text-xl font-bold mb-4">Tous droits réservés</h2>
          <p className="text-gray-700 mb-4">
            © {new Date().getFullYear()} SFDTS. Tous droits réservés. Le
            contenu, la mise en page, le design, les illustrations et tout autre
            élément présent sur ce site sont protégés par le droit d&apos;auteur
            et la propriété intellectuelle. Toute reproduction, distribution ou
            utilisation non autorisée, sous quelque forme que ce soit, est
            strictement interdite sans l&apos;accord écrit préalable de SFDTS.
          </p>
          <p className="text-gray-700 mb-4">
            Les marques, logos et autres signes distinctifs apparaissant sur ce
            site sont la propriété de SFDTS ou de ses partenaires. Leur
            reproduction ou utilisation, sans autorisation expresse, est
            strictement interdite.
          </p>
          <p className="text-gray-700">
            En utilisant ce site, vous acceptez de respecter les présentes
            mentions légales et de ne pas violer les droits de propriété
            intellectuelle de SFDTS ou de ses partenaires.
          </p>
        </section>
      </main>
      {/* Footer */}
      <footer className="text-center py-4 mt-8">
        <p className="text-sm">
          © {new Date().getFullYear()} SFDTS. Tous droits réservés.
        </p>
        <p className="text-sm">
          Ce site est protégé par le droit d&apos;auteur et les droits de
          propriété intellectuelle. Toute reproduction non autorisée est
          interdite.
        </p>
      </footer>
    </div>
  );
};

export default LegalPage;
