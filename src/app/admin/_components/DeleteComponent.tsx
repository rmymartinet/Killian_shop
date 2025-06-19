import { Data } from "@/types/dataTypes";
import { useEffect, useState } from "react";

const DeleteComponent = () => {
  const [items, setItems] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les articles depuis l'API au chargement
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/products", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des articles");
        }

        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur:", err);
      }
    };

    fetchItems();
  }, []);

  // Fonction pour supprimer un article
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/products`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'article");
      }

      // Supprimer l'article de l'état local après suppression
      setItems(items.filter((item) => item.id !== id));
      console.log("Article supprimé avec succès");
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  if (loading) return <div>Chargement des articles...</div>;

  return (
    <div className="rounded-xl bg-white shadow-lg w-full max-w-4xl flex flex-col gap-6 items-center p-3 sm:p-5">
      <h1 className="text-lg sm:text-xl text-red-500 font-semibold text-center">
        Supprimer des articles
      </h1>
      {items.length === 0 ? (
        <p className="text-sm sm:text-base text-gray-500 text-center">Aucun article disponible.</p>
      ) : (
        <ul className="w-full flex flex-col gap-3 sm:gap-4 px-2 sm:px-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b pb-3 sm:pb-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <strong className="text-sm sm:text-base">{item.title}</strong>
                <div className="flex gap-3 text-sm sm:text-base text-gray-600">
                  <span>{item.price}€</span>
                  <span>•</span>
                  <span>{item.quantity} pièces</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white p-2 rounded text-sm sm:text-base w-full sm:w-auto hover:bg-red-600 transition-colors"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteComponent;
