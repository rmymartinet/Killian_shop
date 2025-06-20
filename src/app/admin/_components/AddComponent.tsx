import { uploadToCloudinary } from "@/utils/cloudinary";
import Image from "next/image";
import React, { useState, useRef } from "react";

const imageExamples = [
  { label: "Vue de face", key: "face", example: "/assets/images/face.png" },
  { label: "Vue d'ensemble", key: "ensemble", example: "/assets/images/ensemble.png" },
  { label: "Vue détaillée1", key: "detaillee1", example: "/assets/images/detaillee.png" },
  { label: "Vue détaillée2", key: "detaillee2", example: "/assets/images/detaillee.png" },
  { label: "Vue détaillée3", key: "detaillee3", example: "/assets/images/detaillee.png" },
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
  detaillee1: 2,      // Vue du dessus va à l'index 2 dans l'API
  detaillee2: 3,  // Vue côté droit va à l'index 3 dans l'API
  detaillee3: 4, // Vue côté gauche va à l'index 4 dans l'API
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
    <div className="rounded-xl bg-white w-screen flex flex-col gap-6 items-center p-3 sm:p-5">
      <h1 className="text-lg sm:text-xl text-green-500 font-semibold text-center">Ajouter un article (étape {step}/5)</h1>
      {error && <div className="text-red-500 text-sm sm:text-base text-center px-2">{error}</div>}
      {success && <div className="text-green-600 text-sm sm:text-base text-center px-2">Article ajouté avec succès !</div>}
      {stepError && <div className="text-red-500 text-sm sm:text-base text-center px-2">{stepError}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6 w-full max-w-5xl px-2 sm:px-4">
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
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Section upload d'images */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <h3 className="font-semibold text-base sm:text-lg">Upload des images</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                  {imageExamples.map((img, idx) => (
                    <div key={img.key} className="flex flex-col items-center gap-2 border rounded-lg p-2">
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
                              const url = await uploadToCloudinary(file);
                              const newImages = [...form.images];
                              newImages[idx] = url;
                              setForm({ ...form, images: newImages });
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
                        className="w-20 h-20 sm:w-40 sm:h-40 object-contain border rounded cursor-pointer"
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
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  <h3 className="font-semibold text-base sm:text-lg md:text-2xl text-center">Apercu du produit</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex flex-col items-center gap-3 sm:gap-4">
                      <h1 className="text-2xl font-semibold">En reel sur le site exemple</h1>
                      <p className="text-center">Ici j&apos;ai pris un exemple de produit qui est un pantalon et j&apos;ai fait un apercu de ce que ca donne en reel sur le site</p>
                      <video src="/assets/videos/killian-card.mov" className="w-full h-full object-cover" autoPlay muted loop></video>
                    </div>
                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <h1 className="text-2xl font-semibold text-center">Ici tu peux faire le test pour te donner un apercu</h1>
                    <p className="text-ellipsis text-center">Quand tu ajoutes les images en haut tu peux voir l&apos;apercu de ce que ca donne en reel sur le site</p>
                    <ProductCardPreview 
                      images={form.images} 
                      title={form.title} 
                      price={form.price} 
                    />
                  </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4">
                  <h3 className="font-semibold text-base sm:text-lg">Aperçu des détails du produit</h3>
                  <div className="border grid grid-cols-2 rounded-lg p-3 sm:p-4 bg-white">
                    <div className="flex flex-col items-center gap-3 sm:gap-4">
                      <h1 className="text-2xl font-semibold text-center">Exemple avec avec pants of love sur le site</h1>
                      <p className="text-center">Ici tu peux voir l&apos;apercu des détails du produit les photos ou l&apos;utilisateurs pourra défiler</p>
                      <Image src="/assets/images/thumbnails.png" alt="detaillee" width={100} height={100} className="w-1/2" />
                    </div>
                    <div className="flex flex-col items-center gap-3 sm:gap-4">
                      <h1 className="text-2xl font-semibold text-center">Tu peux voir l&apos;apercu de se que ca donnera ici</h1>
                      <p className="text-center">Ici tu aura 4 photo tu peux en mettre jusqu&apos;a 4 tu peux en mettre moins si tu le souhaite</p>
                      <ProductDetailsPreview images={form.images} />
                    </div>
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
          <div className="flex flex-col gap-4 sm:gap-6">
            <h3 className="font-semibold text-base sm:text-lg text-center">Aperçu de l&apos;annonce</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex flex-col gap-2">
                <h4 className="font-medium">Carte Produit</h4>
                <p className="text-xs text-gray-500">
                  C&apos;est ce que les utilisateurs verront sur la page d&apos;accueil.
                </p>
                <ProductCardPreview
                  images={form.images.filter(Boolean)}
                  title={form.title}
                  price={form.price}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-medium">Détails du produit</h4>
                <p className="text-xs text-gray-500">
                  Ce sont les images qui apparaîtront sur la page détaillée du produit.
                </p>
                <ProductDetailsPreview images={form.images.filter(Boolean)} />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-center text-gray-600 mt-2">
              Si tout semble correct, tu peux soumettre. Sinon, reviens en arrière pour éditer.
            </p>
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
  const [isHovered, setIsHovered] = useState(false);
  const imageFace = images[0] || "/assets/images/face.png";
  const imageEnsemble = images[1] || imageFace;

  return (
    <div 
      className="border rounded-lg p-4 w-full max-w-xs mx-auto bg-gray-50 shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-md bg-white">
        <Image
          src={isHovered ? imageEnsemble : imageFace}
          alt={`Aperçu de ${title}`}
          fill
          className="object-contain"
        />
      </div>
      <div className="mt-3">
        <h5 className="font-semibold truncate">{title}</h5>
        <p className="text-sm text-gray-600">€{price}.00 EUR</p>
      </div>
    </div>
  );
};

// Composant d'aperçu des détails produit
const ProductDetailsPreview = ({ images }: { images: string[] }) => {
  const imageEnsemble = images[1] || "";
  // On prend toutes les images après la "vue d'ensemble" comme images détaillées
  const detailImages = images.slice(2); 

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-3 bg-gray-50 shadow-sm">
      {imageEnsemble && (
        <div className="flex flex-col gap-1">
          <h5 className="text-sm font-medium text-gray-700">Vue d&apos;ensemble</h5>
          <div className="relative w-full aspect-square overflow-hidden rounded-md bg-white">
            <Image
              src={imageEnsemble}
              alt="Aperçu de la vue d'ensemble"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
      {detailImages.length > 0 && (
        <div className="flex flex-col gap-2">
          <h5 className="text-sm font-medium text-gray-700">Vues détaillées</h5>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {detailImages.map((img, index) => (
              img && (
                <div key={index} className="relative aspect-square overflow-hidden rounded-md bg-white">
                  <Image
                    src={img}
                    alt={`Vue détaillée ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddWizard;
