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
    <div className="rounded-xl bg-white shadow-lg w-3/4 flex flex-col gap-10 items-center p-5">
      <h1 className="text-xl text-blue-500 font-semibold">
        Mettre à jour des articles
      </h1>
      {items.length === 0 ? (
        <p>Aucun article disponible.</p>
      ) : (
        <ul className="w-full flex flex-col gap-4">
          {items.map((item) => (
            <li key={item.id} className="flex flex-col gap-2 border-b pb-2">
              {editItemId === item.id ? (
                // Formulaire de mise à jour
                <form
                  onSubmit={(e) => handleUpdate(e, item.id)}
                  className="flex flex-col gap-2"
                >
                  <label>
                    Titre:
                    <input
                      type="text"
                      name="title"
                      value={formValues.title}
                      onChange={handleChange}
                      placeholder="Titre"
                      className="rounded-lg border-slate-200 border"
                    />
                  </label>
                  <label>
                    Prix:
                    <input
                      type="number"
                      name="price"
                      value={formValues.price}
                      onChange={handleChange}
                      placeholder="Prix"
                      className="rounded-lg border-slate-200 border"
                    />
                  </label>
                  <label>
                    Quantité:
                    <input
                      type="number"
                      name="quantity"
                      value={formValues.quantity}
                      onChange={handleChange}
                      placeholder="Quantité"
                      className="rounded-lg border-slate-200 border"
                    />
                  </label>

                  <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded"
                  >
                    Mettre à jour
                  </button>
                </form>
              ) : (
                // Vue normale de l'article
                <div className="flex justify-between items-center">
                  <div>
                    <strong>{item.title}</strong> - {item.price}€ -{" "}
                    {item.quantity} pièces
                  </div>
                  <button
                    onClick={() => setEditItemId(item.id)}
                    className="bg-yellow-500 text-white p-2 rounded"
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
