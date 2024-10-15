import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface Params {
  sessionId: string; // Type pour sessionId
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { sessionId } = params; // Récupération de l'ID de session

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  }

  try {
    // Récupérer la session de paiement de Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Vérifier si le paiement est réussi
    const paymentStatus = session.payment_status;

    if (paymentStatus === "paid") {
      // Mettre à jour la base de données pour marquer la commande comme payée

      const userId = session.metadata?.user_id; // Add null check using '?'
      const productIds = JSON.parse(session.metadata?.product_id ?? "[]"); // Add null check using '?' and provide a default value
      const quantities = JSON.parse(session.metadata?.quantity ?? "[]"); // Add null check using '?' and provide a default value

      // Add null check for userId
      if (userId !== undefined) {
        // Appel de la fonction pour mettre à jour le stock et enregistrer l'achat
        await updateStockAndRecordPurchase(userId, productIds, quantities);
        console.log("Stock mis à jour et achat enregistré");
      }
    }

    return NextResponse.json({ success: true, paymentStatus });
  } catch (error) {
    console.error("Error retrieving session:", error);
    return NextResponse.json(
      { error: "Error retrieving session" },
      { status: 500 }
    );
  }
}

async function updateStockAndRecordPurchase(
  userId: string,
  productIds: string[],
  quantities: number[]
) {
  for (let i = 0; i < productIds.length; i++) {
    const productId = productIds[i];
    const quantity = quantities[i];

    // Vérifiez que quantity est un nombre valide
    if (typeof quantity !== "number" || quantity <= 0) {
      console.error(
        `Quantité invalide pour le produit ${productId}: ${quantity}`
      );
      continue; // Ignorez cet itération si la quantité est invalide
    }

    // Mettre à jour le stock
    await prisma.pants.update({
      where: { id: productId },
      data: {
        quantity: {
          decrement: quantity, // Décrémentez le stock
        },
      },
    });

    // Obtenir le prix du produit
    const product = await prisma.pants.findUnique({
      where: { id: productId },
    });

    try {
      if (product) {
        // Vérification de l'existence du prix
        if (product.price === undefined) {
          throw new Error("Le prix du produit n'est pas défini.");
        }

        // Enregistrer l'achat de l'utilisateur (historique)
        await prisma.purchase.create({
          data: {
            clerkId: userId,
            originalId: productId,
            quantity: quantity,
            totalPrice: product.price * quantity,
          },
        });
      } else {
        console.error(`Produit non trouvé pour l'ID: ${productId}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'achat:", error);
    }
  }
}
