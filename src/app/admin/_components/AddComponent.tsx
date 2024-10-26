import { NextResponse } from "next/server";
import { useState } from "react";

const AddComponent = () => {
  const [category, setCategory] = useState("pants");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [length, setLength] = useState("");
  const [waistline, setWaistline] = useState("");
  const [weight, setWeight] = useState("");
  const [material, setMaterial] = useState("");
  const [imageUrls, setImageUrls] = useState(["", "", "", ""]);
  const [imageDetails, setImageDetails] = useState(["", "", "", ""]);
  const [quantity, setQuantity] = useState("");

  const imageUrlsText = [
    "Image de face",
    "Image de cote regarde vers la gauche",
    "Image de dos",
    "Image de cote regarde vers la droite",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logique pour soumettre le formulaire
    const newItem = {
      category,
      title,
      price: parseInt(price, 10),
      length: parseInt(length, 10),
      weight: parseInt(weight, 10),
      material,
      imageUrls: imageUrls.filter((url) => url !== ""),
      imageDetails: imageDetails.filter((url) => url !== ""),
      quantity: parseInt(quantity, 10),
    };

    if (category === "pants") {
      Object.assign(newItem, { waistline });
    }
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'article");
      }

      const postData = await response.json();
      setTitle("");
      setPrice("");
      setLength("");
      setWaistline("");
      setWeight("");
      setMaterial("");
      setImageUrls(["", "", "", ""]);
      setImageDetails(["", "", "", ""]);
      setQuantity("");
      return new NextResponse(JSON.stringify(postData), {
        status: 201,
      });
    } catch (err) {
      return new NextResponse(JSON.stringify({ error: err }), {
        status: 500,
      });
    }
  };

  return (
    <div className="rounded-xl bg-white shadow-lg w-1/2 flex flex-col gap-10 items-center p-5">
      <h1 className="text-xl text-green-500 font-semibold">
        Ajouter des articles pour mettre Nelly à l&apos;abris 👀
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <label>
          Catégorie:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="pants">Pants</option>
            <option value="shirts">Shirts</option>
          </select>
        </label>
        <label className="flex gap-2 items-center">
          Titre:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Titre"
            className="rounded-lg border-slate-200 border px-4"
          />
        </label>
        <label className="flex gap-2 items-center">
          Prix:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="rounded-lg border-slate-200 border px-4"
          />
        </label>
        <label className="flex gap-2 items-center">
          Longueur:
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            required
            className="rounded-lg border-slate-200 border px-4"
          />
        </label>
        {category === "pants" && (
          <label className="flex gap-2 items-center">
            Tour de taille:
            <input
              type="text"
              value={waistline}
              onChange={(e) => setWaistline(e.target.value)}
              className="rounded-lg border-slate-200 border px-4"
            />
          </label>
        )}
        <label className="flex gap-2 items-center">
          Poids:
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            className="rounded-lg border-slate-200 border px-4"
          />
        </label>
        <label className="flex gap-2 items-center">
          Matériaux:
          <input
            type="text"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            required
            className="rounded-lg border-slate-200 border px-4"
          />
        </label>
        <label className="flex flex-col gap-2">
          URLs des images disposition de face, de cote, de dos et de cote: (Qui
          tourne dans le sens des aiguilles d&apos;une montre)
          {imageUrls.map((url, index) => (
            <input
              key={index}
              type="text"
              value={url}
              onChange={(e) => {
                const newImageUrls = [...imageUrls];
                newImageUrls[index] = e.target.value;
                setImageUrls(newImageUrls);
              }}
              placeholder={imageUrlsText[index]}
              className="rounded-lg border-slate-200 border px-4"
            />
          ))}
        </label>
        <label className="flex flex-col gap-2">
          Détails des images:
          {imageDetails.map((url, index) => (
            <input
              key={index}
              type="text"
              value={url}
              onChange={(e) => {
                const newImageDetails = [...imageDetails];
                newImageDetails[index] = e.target.value;
                setImageDetails(newImageDetails);
              }}
              placeholder={`Image Detail URL ${index + 1}`}
              className="rounded-lg border-slate-200 border px-4"
            />
          ))}
        </label>
        <label className="flex gap-2 items-center">
          Quantité:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="rounded-lg border-slate-200 border px-4"
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddComponent;
