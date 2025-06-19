import { Data } from "@/types/dataTypes";
import { useEffect, useState } from "react";

const UpdateComponent = () => {
  const [items, setItems] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    title: "",
    price: "",
    quantity: "",
  });

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

  // Gérer le changement dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // Fonction pour soumettre les modifications
  const handleUpdate = async (e: React.FormEvent, id: string) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/products`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...formValues }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'article");
      }

      const updatedItem = await response.json();

      // Mettre à jour l'état local avec les nouvelles données
      setItems(items.map((item) => (item.id === id ? updatedItem : item)));
      setEditItemId(null);
      console.log("Article mis à jour avec succès");
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  if (loading) return <div>Chargement des articles...</div>;

  return (
    <div className="rounded-xl bg-white shadow-lg w-full max-w-4xl flex flex-col gap-6 items-center p-3 sm:p-5">
      <h1 className="text-lg sm:text-xl text-blue-500 font-semibold text-center">
        Mettre à jour des articles
      </h1>
      {items.length === 0 ? (
        <p className="text-sm sm:text-base text-gray-500 text-center">Aucun article disponible.</p>
      ) : (
        <ul className="w-full flex flex-col gap-3 sm:gap-4 px-2 sm:px-4">
          {items.map((item) => (
            <li key={item.id} className="flex flex-col gap-3 border-b pb-3 sm:pb-4">
              {editItemId === item.id ? (
                // Formulaire de mise à jour
                <form
                  onSubmit={(e) => handleUpdate(e, item.id)}
                  className="flex flex-col gap-3 sm:gap-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <label className="flex flex-col gap-2">
                      <span className="text-sm sm:text-base">Titre:</span>
                      <input
                        type="text"
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
                        placeholder="Titre"
                        className="rounded-lg border-slate-200 border px-3 py-2 text-sm sm:text-base w-full"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-sm sm:text-base">Prix:</span>
                      <input
                        type="number"
                        name="price"
                        value={formValues.price}
                        onChange={handleChange}
                        placeholder="Prix"
                        className="rounded-lg border-slate-200 border px-3 py-2 text-sm sm:text-base w-full"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-sm sm:text-base">Quantité:</span>
                      <input
                        type="number"
                        name="quantity"
                        value={formValues.quantity}
                        onChange={handleChange}
                        placeholder="Quantité"
                        className="rounded-lg border-slate-200 border px-3 py-2 text-sm sm:text-base w-full"
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded text-sm sm:text-base w-full sm:w-auto self-end hover:bg-green-600 transition-colors"
                  >
                    Mettre à jour
                  </button>
                </form>
              ) : (
                // Vue normale de l'article
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <strong className="text-sm sm:text-base">{item.title}</strong>
                    <div className="flex gap-3 text-sm sm:text-base text-gray-600">
                      <span>{item.price}€</span>
                      <span>•</span>
                      <span>{item.quantity} pièces</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setEditItemId(item.id);
                      setFormValues({
                        title: item.title || "",
                        price: (item.price || 0).toString(),
                        quantity: (item.quantity || 0).toString(),
                      });
                    }}
                    className="bg-yellow-500 text-white p-2 rounded text-sm sm:text-base w-full sm:w-auto hover:bg-yellow-600 transition-colors"
                  >
                    Modifier
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpdateComponent;
