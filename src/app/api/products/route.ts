import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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

//Permet de forcer le chargement dynamique des pages pour afficher les changements de la base de données en temps réel
export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const pantsData = await prisma.pants.findMany();
    const shirtsData = await prisma.shirts.findMany();
    
    // Traitement des données pour créer imageUrls et imageDetails
    const processedPantsData = pantsData.map((item: any) => {
      // Vérifier si c'est l'ancienne structure
      if (item.imageUrls && Array.isArray(item.imageUrls)) {
        return {
          ...item,
          imageUrls: item.imageUrls,
          imageDetails: item.imageDetails || []
        };
      }
      
      // Nouvelle structure - créer imageUrls et imageDetails
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
      // Vérifier si c'est l'ancienne structure
      if (item.imageUrls && Array.isArray(item.imageUrls)) {
        return {
          ...item,
          imageUrls: item.imageUrls,
          imageDetails: item.imageDetails || []
        };
      }
      
      // Nouvelle structure - créer imageUrls et imageDetails
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
    });
  } catch (error) {
    console.error("Erreur API GET:", error);
    if (
      error instanceof Error &&
      error.message.includes("Database connection error")
    ) {
      return new NextResponse(
        JSON.stringify({ error: "Database connection error" }),
        { status: 500 }
      );
    }

    // Pour toute autre erreur, renvoie un message d'erreur générique
    const message = getErrorMessage(error);
    return new NextResponse(JSON.stringify({ error: message }), {
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    const item = await req.json();

    // Traitement des images pour mapper vers les nouveaux champs
    const filteredImages = item.images ? item.images.filter((url: string) => url !== "") : [];
    
    const processedItem = {
      ...item,
      // Mapper les images vers les nouveaux champs
      imageFace: filteredImages[0] || "",
      imageCoteDroit: filteredImages[1] || null,
      imageCoteGauche: filteredImages[2] || null,
      imageDos: filteredImages[3] || null,
      imageDessus: filteredImages[4] || null,
      imageEnsemble: filteredImages[5] || null,
      imageDetaillee: filteredImages[6] || null,
      imageEtiquette: filteredImages[7] || null
    };

    // Supprimer les anciens champs
    delete processedItem.images;
    delete processedItem.imageUrls;
    delete processedItem.imageDetails;

    let data;

    if (item.category === "pants") {
      data = await prisma.pants.create({
        data: processedItem,
      });
    } else if (item.category === "shirts") {
      data = await prisma.shirts.create({
        data: processedItem,
      });
    }

    return new NextResponse(JSON.stringify(data), { status: 201 });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Database connection error")
    ) {
      return new NextResponse(
        JSON.stringify({ error: "Database connection error" }),
        { status: 500 }
      );
    }

    // Pour toute autre erreur, renvoie un message d'erreur générique
    const message = getErrorMessage(error);
    return new NextResponse(JSON.stringify({ error: message }), {
      status: 500,
    });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { id, category } = await req.json();

    let data;

    if (category === "pants") {
      data = await prisma.pants.delete({
        where: {
          id: id,
        },
      });
    } else if (category === "shirts") {
      data = await prisma.shirts.delete({
        where: {
          id: id,
        },
      });
    } else {
      // Essayer de supprimer dans les deux tables si la catégorie n'est pas spécifiée
      try {
        data = await prisma.pants.delete({
          where: {
            id: id,
          },
        });
      } catch {
        data = await prisma.shirts.delete({
          where: {
            id: id,
          },
        });
      }
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Database connection error")
    ) {
      return new NextResponse(
        JSON.stringify({ error: "Database connection error" }),
        { status: 500 }
      );
    }

    // Pour toute autre erreur, renvoie un message d'erreur générique
    const message = getErrorMessage(error);
    return new NextResponse(JSON.stringify({ error: message }), {
      status: 500,
    });
  }
};

export const PUT = async (req: Request) => {
  try {
    const { id, title, price, quantity } = await req.json();

    const updatedItem = await prisma.pants.update({
      where: { id },
      data: {
        title,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
      },
    });

    return new NextResponse(JSON.stringify(updatedItem), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Erreur lors de la mise à jour de l'article" }),
      { status: 500 }
    );
  }
};
