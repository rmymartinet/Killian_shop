import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/sendemail"; // Assure-toi d'avoir créé cette fonction d'envoi d'email
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

    // Récupérer l'adresse e-mail depuis la session Stripe
    const customerEmail = session.customer_email;

    if (!customerEmail) {
      return NextResponse.json(
        { error: "Customer email is required" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe déjà dans la base de données par son e-mail
    let user = await prisma.user.findUnique({
      where: { email: customerEmail },
    });

    // Si l'utilisateur n'existe pas, le créer
    if (!user) {
      console.log(
        "Utilisateur non trouvé, création d'un nouvel utilisateur..."
      );

      // Créer un nouvel utilisateur avec l'e-mail de Stripe
      user = await prisma.user.create({
        data: {
          email: customerEmail,
          clerkId: "",
        },
      });

      console.log("Nouvel utilisateur créé:", user);
    } else {
      console.log("Utilisateur existant:", user);
    }

    // Vérifier si le paiement est réussi
    const paymentStatus = session.payment_status;

    if (paymentStatus === "paid") {
      const productIds = JSON.parse(session.metadata?.product_id ?? "[]");
      const quantities = JSON.parse(session.metadata?.quantity ?? "[]");

      await updateStockAndRecordPurchase(
        user.id, // Utiliser l'ID de l'utilisateur récupéré ou créé
        productIds,
        quantities,
        customerEmail
      );
      console.log("Stock mis à jour et achat enregistré");
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
  quantities: number[],
  userEmail: string
) {
  // Mise à jour du stock et enregistrement de l'achat
  for (let i = 0; i < productIds.length; i++) {
    const productId = productIds[i];
    const quantity = quantities[i];

    if (typeof quantity !== "number" || quantity <= 0) {
      console.error(
        `Quantité invalide pour le produit ${productId}: ${quantity}`
      );
      continue;
    }

    // Mettre à jour le stock
    await prisma.pants.update({
      where: { id: productId },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });

    // Obtenir le prix du produit
    const product = await prisma.pants.findUnique({
      where: { id: productId },
    });

    if (product && product.price !== undefined) {
      // Enregistrer l'achat dans l'historique
      await prisma.purchase.create({
        data: {
          clerkId: userId,
          originalId: productId,
          quantity: quantity,
          totalPrice: product.price * quantity,
        },
      });

      const emailContent = `
        <h1>Merci pour votre achat !</h1>
        <p>Vous avez acheté ${quantity} exemplaire(s) de ${product.title}.</p>
        <p>Total: ${product.price * quantity} €</p>
      `;
      await sendEmail(userEmail, "Confirmation d'achat", emailContent);
      console.log("Email de confirmation envoyé à", userEmail);
    } else {
      console.error(`Produit non trouvé pour l'ID: ${productId}`);
    }
  }
}
