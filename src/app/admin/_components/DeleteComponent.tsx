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
    <div className="rounded-xl bg-white shadow-lg w-3/4 flex flex-col gap-10 items-center p-5">
      <h1 className="text-xl text-red-500 font-semibold">
        Supprimer des articles
      </h1>
      {items.length === 0 ? (
        <p>Aucun article disponible.</p>
      ) : (
        <ul className="w-full flex flex-col gap-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <strong>{item.title}</strong> - {item.price}€ - {item.quantity}{" "}
                pièces
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white p-2 rounded"
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
