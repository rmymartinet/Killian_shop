import { uploadToCloudinary } from "@/utils/cloudinary";
import Image from "next/image";
import React, { useState, useRef } from "react";

const imageExamples = [
  { label: "Vue de face", key: "face", example: "/assets/images/face.png" },
  { label: "Vue d'ensemble", key: "ensemble", example: "/assets/images/ensemble.png" },
  { label: "Vue du dessus", key: "dessus", example: "/assets/images/dessus.png" },
  { label: "Vue côté droit", key: "cote_droit", example: "/assets/images/cote_droit.png" },
  { label: "Vue côté gauche", key: "cote_gauche", example: "/assets/images/cote_gauche.png" },
  { label: "Vue de dos", key: "dos", example: "/assets/images/dos.png" },
  { label: "Vue détaillée", key: "detaillee", example: "/assets/images/detaillee.png" },
  { label: "Composition / Étiquette", key: "etiquette", example: "/assets/images/etiquette.png" },
];

const initialForm = {
  title: "",
  category: "",
  price: "",
  length: "",
  waistline: "",
  weight: "",
  material: "",
  quantity: "",
  images: Array(imageExamples.length).fill("") as string[],
};

// Mapping des indices pour l'API
const apiIndexMapping = {
  face: 0,        // Vue de face va à l'index 0 dans l'API
  ensemble: 1,    // Vue d'ensemble va à l'index 1 dans l'API
  dessus: 2,      // Vue du dessus va à l'index 2 dans l'API
  cote_droit: 3,  // Vue côté droit va à l'index 3 dans l'API
  cote_gauche: 4, // Vue côté gauche va à l'index 4 dans l'API
  dos: 5,         // Vue de dos va à l'index 5 dans l'API
  detaillee: 6,   // Vue détaillée va à l'index 6 dans l'API
  etiquette: 7    // Composition/Étiquette va à l'index 7 dans l'API
};

const AddWizard = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, idx?: number) => {
    if (typeof idx === "number") {
      const newImages = [...form.images];
      newImages[idx] = e.target.value;
      setForm({ ...form, images: newImages });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const nextStep = () => {
    setStepError(null);
    if (step === 1 && !form.title.trim()) {
      setStepError("Le titre est obligatoire.");
      return;
    }
    if (step === 2 && !form.category) {
      setStepError("La catégorie est obligatoire.");
      return;
    }
    if (step === 3) {
      if (!form.price || !form.length || !form.weight || !form.material || !form.quantity) {
        setStepError("Tous les champs sont obligatoires.");
        return;
      }
      if (form.category === "pants" && !form.waistline) {
        setStepError("Le tour de taille est obligatoire pour un pantalon.");
        return;
      }
    }
    if (step === 4 && form.images.filter((url) => url).length === 0) {
      setStepError("Ajoute au moins une image.");
      return;
    }
    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Réorganiser les images selon l'ordre attendu par l'API
      const reorderedImages = Array(8).fill(null);
      form.images.forEach((url, index) => {
        if (url === "") return;
        
        // Trouver la clé correspondante dans imageExamples
        const key = imageExamples[index].key;
        // Utiliser le mapping pour trouver l'index correct dans l'API
        const apiIndex = apiIndexMapping[key as keyof typeof apiIndexMapping];
        reorderedImages[apiIndex] = url;
      });
      
      // Log détaillé pour voir l'ordre des images
      console.log("Images dans le formulaire:", form.images);
      console.log("Images réorganisées pour l'API:", reorderedImages);
      
      // S'assurer que les valeurs numériques sont bien des nombres
      const newItem = {
        title: form.title.trim(),
        category: form.category,
        price: Number(form.price),
        length: Number(form.length),
        weight: Number(form.weight),
        quantity: Number(form.quantity),
        material: form.material.trim(),
        images: reorderedImages,
        ...(form.category === "pants" ? { waistline: form.waistline.trim() } : {})
      };
      
      console.log("Données envoyées:", newItem);
      
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur détaillée:", errorData);
        throw new Error(
          errorData.details?.[0]?.message || 
          errorData.error || 
          "Erreur lors de l'ajout de l'article"
        );
      }
      
      setSuccess(true);
      setForm(initialForm);
      setStep(1);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-white shadow-lg w-full max-w-4xl flex flex-col gap-6 items-center p-3 sm:p-5">
      <h1 className="text-lg sm:text-xl text-green-500 font-semibold text-center">Ajouter un article (étape {step}/5)</h1>
      {error && <div className="text-red-500 text-sm sm:text-base text-center px-2">{error}</div>}
      {success && <div className="text-green-600 text-sm sm:text-base text-center px-2">Article ajouté avec succès !</div>}
      {stepError && <div className="text-red-500 text-sm sm:text-base text-center px-2">{stepError}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6 w-full max-w-2xl px-2 sm:px-4">
        {step === 1 && (
          <div className="flex flex-col gap-3 sm:gap-4">
            <label className="flex flex-col gap-2">
              Titre de l&apos;annonce :
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="rounded-lg border-slate-200 border px-3 py-2 text-sm sm:text-base w-full"
                placeholder="Ex: Hybrid pants..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    nextStep();
                  }
                }}
              />
            </label>
            <button type="button" className="bg-blue-500 text-white p-2 rounded text-sm sm:text-base w-full sm:w-auto sm:self-end" onClick={nextStep} disabled={!form.title}>
              Continuer
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-3 sm:gap-4">
            <label className="flex flex-col gap-2">
              Catégorie :
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="rounded-lg border-slate-200 border px-3 py-2 text-sm sm:text-base w-full"
              >
                <option value="">Choisissez</option>
                <option value="pants">Pantalon</option>
                <option value="shirts">Shirt</option>
              </select>
            </label>
            <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row sm:justify-end">
              <button type="button" className="bg-gray-300 text-black p-2 rounded text-sm sm:text-base w-full sm:w-auto" onClick={prevStep}>
                Retour
              </button>
              <button type="button" className="bg-blue-500 text-white p-2 rounded text-sm sm:text-base w-full sm:w-auto" onClick={nextStep} disabled={!form.category}>
                Continuer
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <label className="flex flex-col gap-2">
                Prix :
                <input type="number" name="price" value={form.price} onChange={handleChange} required className="rounded-lg border-slate-200 border px-3 py-2 text-sm sm:text-base w-full" />
              </label>
              <label className="flex flex-col gap-2">
                Longueur :
                <input type="number" name="length" value={form.length} onChange={handleChange} required className="rounded-lg border-slate-200 border px-3 py-2 text-sm sm:text-base w-full" />
              </label>
              {form.category === "pants" && (
                <label className="flex flex-col gap-2">
                  Tour de taille :
                  <input type="text" name="waistline" value={form.waistline} onChange={handleChange} className="rounded-lg border-slate-200 border px-3 py-2 text-sm sm:text-base w-full" />
                </label>
              )}
              <label className="flex flex-col gap-2">
                Poids :
                <input type="number" name="weight" value={form.weight} onChange={handleChange} required className="rounded-lg border-slate-200 border px-3 py-2 text-sm sm:text-base w-full" />
              </label>
              <label className="flex flex-col gap-2">
                Matériaux :
                <input type="text" name="material" value={form.material} onChange={handleChange} required className="rounded-lg border-slate-200 border px-3 py-2 text-sm sm:text-base w-full" />
              </label>
              <label className="flex flex-col gap-2">
                Quantité :
                <input type="number" name="quantity" value={form.quantity} onChange={handleChange} required className="rounded-lg border-slate-200 border px-3 py-2 text-sm sm:text-base w-full" />
              </label>
            </div>
            <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row sm:justify-end mt-2">
              <button type="button" className="bg-gray-300 text-black p-2 rounded text-sm sm:text-base w-full sm:w-auto" onClick={prevStep}>
                Retour
              </button>
              <button type="button" className="bg-blue-500 text-white p-2 rounded text-sm sm:text-base w-full sm:w-auto" onClick={nextStep}>
                Continuer
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Section upload d'images */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <h3 className="font-semibold text-base sm:text-lg">Upload des images</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                  {imageExamples.map((img, idx) => (
                    <div key={img.key} className="flex flex-col items-center gap-2 border rounded-lg p-2 border-2 border-red-400">
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={(el) => {
                          if (el) fileInputRefs.current[idx] = el;
                        }}
                        onChange={async (e) => {
                          if (!e.target.files || e.target.files.length === 0) return;
                          const file = e.target.files[0];
                          if (file) {
                            try {
                              console.log(`Upload de l'image ${idx}:`, file.name);
                              const url = await uploadToCloudinary(file);
                              console.log(`URL Cloudinary générée pour ${idx}:`, url);
                              const newImages = [...form.images];
                              newImages[idx] = url;
                              setForm({ ...form, images: newImages });
                              console.log(`Images mises à jour:`, newImages);
                            } catch (error) {
                              console.error(`Erreur upload image ${idx}:`, error);
                              setError(`Erreur lors de l'upload de l'image ${idx + 1}`);
                            }
                          }
                        }}
                      />
                      <Image
                        src={form.images[idx] || img.example}
                        alt={img.label}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain border rounded cursor-pointer"
                        width={80}
                        height={80}
                        onClick={() => {
                          if (fileInputRefs.current[idx]) fileInputRefs.current[idx]!.click();
                        }}
                        style={{ 
                          minWidth: '64px',
                          minHeight: '64px'
                        }}
                      />
                      <span className="text-xs sm:text-sm text-gray-600 text-center">{img.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section aperçu */}
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <h3 className="font-semibold text-base sm:text-lg">Aperçu ProductCard</h3>
                  <div className="border rounded-lg p-3 sm:p-4 bg-white">
                    <ProductCardPreview 
                      images={form.images} 
                      title={form.title} 
                      price={form.price} 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4">
                  <h3 className="font-semibold text-base sm:text-lg">Aperçu détails produit</h3>
                  <div className="border rounded-lg p-3 sm:p-4 bg-white">
                    <ProductDetailsPreview images={form.images} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row sm:justify-end">
              <button type="button" className="bg-gray-300 text-black p-2 rounded text-sm sm:text-base w-full sm:w-auto" onClick={prevStep}>
                Retour
              </button>
              <button type="button" className="bg-blue-500 text-white p-2 rounded text-sm sm:text-base w-full sm:w-auto" onClick={nextStep}>
                Continuer
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col gap-3 sm:gap-4">
            <h2 className="text-base sm:text-lg font-semibold">Récapitulatif</h2>
            <ul className="text-sm sm:text-base space-y-2">
              <li><strong>Titre :</strong> {form.title}</li>
              <li><strong>Catégorie :</strong> {form.category === "pants" ? "Pantalon" : "Shirt"}</li>
              <li><strong>Prix :</strong> {form.price} €</li>
              <li><strong>Longueur :</strong> {form.length} cm</li>
              {form.category === "pants" && <li><strong>Tour de taille :</strong> {form.waistline}</li>}
              <li><strong>Poids :</strong> {form.weight} g</li>
              <li><strong>Matériaux :</strong> {form.material}</li>
              <li><strong>Quantité :</strong> {form.quantity}</li>
              <li><strong>Photos :</strong> {form.images.filter((url) => url).length} ajoutées</li>
            </ul>
            <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row sm:justify-end mt-2">
              <button type="button" className="bg-gray-300 text-black p-2 rounded text-sm sm:text-base w-full sm:w-auto" onClick={prevStep}>
                Retour
              </button>
              <button type="submit" className="bg-green-500 text-white p-2 rounded text-sm sm:text-base w-full sm:w-auto" disabled={loading}>
                {loading ? "Ajout..." : "Valider et ajouter"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

// Composant d'aperçu du ProductCard
const ProductCardPreview = ({ images, title, price }: { images: string[], title: string, price: string }) => {
  const [hover, setHover] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Image principale (vue de face) et image de détail (vue d'ensemble)
  const mainImage = images[0] || "/assets/images/face.png";
  const detailImage = images[1] || images[0] || "/assets/images/ensemble.png"; // Vue d'ensemble est à l'index 1

  return (
    <div className="flex flex-col gap-4 h-full w-full max-w-lg max-h-lg">
      <div
        className="p-6 bg-[#fafafa] relative flex-1 min-h-0"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="relative w-full h-full max-w-sm max-h-sm">
          <div className="w-full h-full aspect-square">
            <Image
              src={hover ? detailImage : mainImage}
              alt={title}
              width={700}
              height={700}
              priority
              quality={100}
              loading="eager"
              className="w-full h-full object-cover transition-opacity duration-300"
              onLoad={() => setImageLoaded(true)}
              style={{ 
                opacity: imageLoaded ? 1 : 0.8,
                minHeight: '200px',
                minWidth: '200px'
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 pl-6 pb-6">
        <p className="text-sm font-semibold">{title || "Titre du produit"}</p>
        <p className="text-sm">€{price || "0"}.00 EUR</p>
      </div>
    </div>
  );
};

// Composant d'aperçu des détails produit
const ProductDetailsPreview = ({ images }: { images: string[] }) => {
  // Sélection des images principales uniquement
  const mainImages = [
    { index: 0, image: images[0], label: "Vue de face" },      // imageFace
    { index: 1, image: images[1], label: "Vue d'ensemble" },   // imageEnsemble
    { index: 2, image: images[2], label: "Vue du dessus" },    // imageDessus
    { index: 3, image: images[3], label: "Vue côté droit" },   // imageCoteDroit
    { index: 4, image: images[4], label: "Vue côté gauche" },  // imageCoteGauche
    { index: 5, image: images[5], label: "Vue de dos" },         // imageDos
    { index: 6, image: images[6], label: "Vue détaillée" },    // imageDetaillee
    { index: 7, image: images[7], label: "Étiquette" }         // imageEtiquette
  ];

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {mainImages.map(({ index, image, label }) => (
        <div
          key={index}
          className="w-full aspect-[4/3] rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-300 transition-all duration-200"
        >
          {image ? (
            <div className="relative w-full h-full group">
              <Image
                src={image}
                alt={label}
                width={400}
                height={300}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                style={{ 
                  minWidth: '100%',
                  minHeight: '100%'
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {label}
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 text-sm p-4">
              {label}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AddWizard;
