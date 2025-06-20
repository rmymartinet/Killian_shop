import { z } from "zod";

// Schéma de validation pour les produits
export const ProductSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    category: z.enum(["pants", "shirts"], { 
      errorMap: () => ({ message: "Catégorie invalide" })
    }),
    price: z.number().positive("Le prix doit être positif"),
    length: z.number().positive("La longueur doit être positive"),
    weight: z.number().positive("Le poids doit être positif"),
    material: z.string().min(1, "Le matériau est requis"),
    quantity: z.number().int().positive("La quantité doit être positive"),
    waistline: z.string().optional(),
    images: z.array(z.string().url().nullable()).optional(),
    // Ces champs sont optionnels car ils seront générés à partir du tableau images
    imageFace: z.string().optional(),
    imageCoteDroit: z.string().nullable().optional(),
    imageCoteGauche: z.string().nullable().optional(),
    imageDos: z.string().nullable().optional(),
    imageDessus: z.string().nullable().optional(),
    imageEnsemble: z.string().nullable().optional(),
    imageDetaillee: z.string().nullable().optional(),
    imageEtiquette: z.string().nullable().optional()
  });