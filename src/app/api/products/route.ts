import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { z } from "zod";
import { ProductSchema } from "@/schemas/product.schema";
import Stripe from "stripe";

// Initialisation de Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
  typescript: true,
});

// Define an interface for items that have image properties
interface ProductImageItem {
  imageFace?: string | null;
  imageDetaillee1?: string | null;
  imageDetaillee2?: string | null;
  imageDetaillee3?: string | null;
  imageEnsemble?: string | null;
  [key: string]: unknown;
}

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;
  try {
    return { message: JSON.stringify(maybeError) };
  } catch {
    return { message: String(maybeError) };
  }
}

function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

// Fonction d'aide pour sécuriser les URLs d'images
function getSafeImageUrl(url: string | null | undefined): string {
  return (url && typeof url === 'string' && url.trim() !== '') ? url : "";
}

// Middleware de vérification d'authentification admin
async function verifyAdminAuth(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    throw new Error("Non autorisé");
  }
  // Ici vous pouvez ajouter une vérification supplémentaire pour confirmer que l'utilisateur est bien un admin
  // par exemple en vérifiant son rôle dans la base de données
}

//Permet de forcer le chargement dynamique des pages pour afficher les changements de la base de données en temps réel
export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const pantsData = await prisma.pants.findMany();
    const shirtsData = await prisma.shirts.findMany();

    console.log("PANTS DATA",pantsData)
    console.log("SHIRTS DATA",shirtsData)
    
    // Traitement des données pour créer imageUrls et imageDetails
    const processedPantsData = pantsData.map((item: ProductImageItem) => {
      const imageUrls = [
        getSafeImageUrl(item.imageFace),
        getSafeImageUrl(item.imageEnsemble),
      ].filter(Boolean);
      
      const imageDetails = [
        getSafeImageUrl(item.imageEnsemble),
        getSafeImageUrl(item.imageDetaillee1),
        getSafeImageUrl(item.imageDetaillee2),
        getSafeImageUrl(item.imageDetaillee3),
      ].filter(Boolean);

      console.log("IMAGE URLS",imageUrls)
      console.log("IMAGE DETAILS",imageDetails)
      
      return {
        ...item,
        imageUrls,
        imageDetails
      };
    });
    
    const processedShirtsData = shirtsData.map((item: ProductImageItem) => {
      const imageUrls = [
        getSafeImageUrl(item.imageFace),
        getSafeImageUrl(item.imageEnsemble),
        getSafeImageUrl(item.imageDetaillee1),
        getSafeImageUrl(item.imageDetaillee2),
        getSafeImageUrl(item.imageDetaillee3),
      ].filter(Boolean);
      
      const imageDetails = [
        getSafeImageUrl(item.imageEnsemble),
        getSafeImageUrl(item.imageDetaillee1),
        getSafeImageUrl(item.imageDetaillee2),
        getSafeImageUrl(item.imageDetaillee3),
      ].filter(Boolean);
      
      return {
        ...item,
        imageUrls,
        imageDetails
      };
    });
    
    const combinedData = [...processedPantsData, ...processedShirtsData];

    return new NextResponse(JSON.stringify(combinedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error("Erreur API GET:", error);
    const message = getErrorMessage(error);
    return new NextResponse(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await verifyAdminAuth(req);
    
    const item = await req.json();
  
    
    // Validation des données
    const validationResult = ProductSchema.safeParse(item);
    if (!validationResult.success) {
      console.error("Erreur de validation détaillée:", JSON.stringify(validationResult.error.errors, null, 2));
      return new NextResponse(
        JSON.stringify({ 
          error: "Données invalides", 
          details: validationResult.error.errors,
          receivedData: item // Ajouter les données reçues pour le débogage
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    
    const processedItem = {
      ...item,
      // Utiliser directement les indices du tableau images dans le nouvel ordre
      imageFace: item.images[0] || "",
      imageEnsemble: item.images[1] || null,
      imageDetaillee1: item.images[2] || null,
      imageDetaillee2: item.images[3] || null,
      imageDetaillee3: item.images[4] || null,
    };



    delete processedItem.images;


    let newProductInDb;

    await prisma.$transaction(async (tx) => {
      // 1. Créer le produit dans la base de données locale
      if (item.category === "pants") {
        newProductInDb = await tx.pants.create({ data: processedItem });
      } else if (item.category === "shirts") {
        newProductInDb = await tx.shirts.create({ data: processedItem });
      } else {
        throw new Error("Invalid category");
      }

      if (!newProductInDb) {
        throw new Error("Failed to create product in database");
      }

      // 2. Créer le produit sur Stripe
      const stripeProduct = await stripe.products.create({
        name: newProductInDb.title,
        description: `Matériaux: ${newProductInDb.material}, Poids: ${newProductInDb.weight}g`,
        images: [processedItem.imageFace]
      });

      // 3. Créer le prix sur Stripe (en centimes)
      const stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: newProductInDb.price * 100, // Le prix doit être en centimes
        currency: 'eur',
      });

      // 4. Mettre à jour le produit local avec les IDs Stripe
      const updateData = {
        stripeProductId: stripeProduct.id,
        stripePriceId: stripePrice.id,
      };

      if (item.category === "pants") {
        await tx.pants.update({
          where: { id: newProductInDb.id },
          data: updateData,
        });
      } else if (item.category === "shirts") {
        await tx.shirts.update({
          where: { id: newProductInDb.id },
          data: updateData,
        });
      }
    });

    console.log("Produit créé avec succès dans la BDD et sur Stripe");

    return new NextResponse(JSON.stringify(newProductInDb), { 
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Erreur API POST:", error);
    const message = getErrorMessage(error);
    if (message.includes("Non autorisé")) {
      return new NextResponse(JSON.stringify({ error: message }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new NextResponse(JSON.stringify({ error: message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await verifyAdminAuth(req);
    
    const { id, category } = await req.json();
    
    if (!id) {
      return new NextResponse(
        JSON.stringify({ error: "ID manquant" }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    let data;

    await prisma.$transaction(async (tx) => {
      if (category === "pants") {
        data = await tx.pants.delete({
          where: { id },
        });
      } else if (category === "shirts") {
        data = await tx.shirts.delete({
          where: { id },
        });
      } else {
        // Essayer de supprimer dans les deux tables si la catégorie n'est pas spécifiée
        try {
          data = await tx.pants.delete({
            where: { id },
          });
        } catch {
          data = await tx.shirts.delete({
            where: { id },
          });
        }
      }
    });

    return new NextResponse(JSON.stringify(data), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Erreur API DELETE:", error);
    const message = getErrorMessage(error);
    if (message.includes("Non autorisé")) {
      return new NextResponse(JSON.stringify({ error: message }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new NextResponse(JSON.stringify({ error: message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    await verifyAdminAuth(req);
    
    const { id, title, price, quantity } = await req.json();
    
    if (!id) {
      return new NextResponse(
        JSON.stringify({ error: "ID manquant" }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validation des données de mise à jour
    const updateData = {
      title,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10)
    };

    const validationSchema = z.object({
      title: z.string().min(1, "Le titre est requis"),
      price: z.number().positive("Le prix doit être positif"),
      quantity: z.number().int().positive("La quantité doit être positive")
    });

    const validationResult = validationSchema.safeParse(updateData);
    if (!validationResult.success) {
      return new NextResponse(
        JSON.stringify({ 
          error: "Données invalides", 
          details: validationResult.error.errors 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    let updatedItem;
    await prisma.$transaction(async (tx) => {
      try {
        updatedItem = await tx.pants.update({
          where: { id },
          data: updateData,
        });
      } catch {
        updatedItem = await tx.shirts.update({
          where: { id },
          data: updateData,
        });
      }
    });

    return new NextResponse(JSON.stringify(updatedItem), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Erreur API PUT:", error);
    const message = getErrorMessage(error);
    if (message.includes("Non autorisé")) {
      return new NextResponse(JSON.stringify({ error: message }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new NextResponse(JSON.stringify({ error: message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
