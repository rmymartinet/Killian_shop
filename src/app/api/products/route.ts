import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { z } from "zod";
import { ProductSchema } from "@/schemas/product.schema";




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
    
    // Traitement des données pour créer imageUrls et imageDetails
    const processedPantsData = pantsData.map((item: any) => {
      const imageUrls = [
        item.imageFace,
        item.imageCoteDroit,
        item.imageCoteGauche,
        item.imageDos,
        item.imageDessus,
        item.imageEnsemble,
        item.imageDetaillee,
        item.imageEtiquette
      ].filter(Boolean);
      
      const imageDetails = [
        item.imageCoteDroit,
        item.imageCoteGauche,
        item.imageDos,
        item.imageDessus,
        item.imageEnsemble,
        item.imageDetaillee,
        item.imageEtiquette
      ].filter(Boolean);
      
      return {
        ...item,
        imageUrls,
        imageDetails
      };
    });
    
    const processedShirtsData = shirtsData.map((item: any) => {
      const imageUrls = [
        item.imageFace,
        item.imageCoteDroit,
        item.imageCoteGauche,
        item.imageDos,
        item.imageDessus,
        item.imageEnsemble,
        item.imageDetaillee,
        item.imageEtiquette
      ].filter(Boolean);
      
      const imageDetails = [
        item.imageCoteDroit,
        item.imageCoteGauche,
        item.imageDos,
        item.imageDessus,
        item.imageEnsemble,
        item.imageDetaillee,
        item.imageEtiquette
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
      imageDessus: item.images[2] || null,
      imageCoteDroit: item.images[3] || null,
      imageCoteGauche: item.images[4] || null,
      imageDos: item.images[5] || null,
      imageDetaillee: item.images[6] || null,
      imageEtiquette: item.images[7] || null
    };


    delete processedItem.images;


    let data;

    await prisma.$transaction(async (tx) => {
      if (item.category === "pants") {
        data = await tx.pants.create({
          data: processedItem,
        });
      } else if (item.category === "shirts") {
        data = await tx.shirts.create({
          data: processedItem,
        });
      }
    });

    console.log("Produit créé avec succès:", data);

    return new NextResponse(JSON.stringify(data), { 
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
