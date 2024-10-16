import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/sendemail"; // Assure-toi d'avoir créé cette fonction d'envoi d'email
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface Params {
  sessionId: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { sessionId } = params;

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  }

  try {
    // Récupérer la session de paiement de Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const paymentStatus = session.payment_status;

    if (paymentStatus === "paid") {
      // Récupérer les détails du client et de l'adresse
      const customerEmail = session.customer_details?.email;
      const customerAddress = session.customer_details?.address;

      if (!customerEmail) {
        return NextResponse.json(
          { error: "Customer email is required" },
          { status: 400 }
        );
      }

      // Récupérer l'ID utilisateur de Clerk depuis les métadonnées de la session
      const clerkUserId = session.metadata?.user_id || undefined;

      // Vérifier si l'utilisateur existe déjà dans la base de données par son e-mail
      let user = await prisma.user.findUnique({
        where: { email: customerEmail },
      });

      // Si l'utilisateur n'existe pas, le créer
      if (!user) {
        user = await prisma.user.create({
          data: {
            clerkId: clerkUserId,
            email: customerEmail,
            addressLine1: customerAddress?.line1,
            addressLine2: customerAddress?.line2,
            addressCity: customerAddress?.city,
            addressState: customerAddress?.state,
            addressPostalCode: customerAddress?.postal_code,
            addressCountry: customerAddress?.country,
          },
        });
      }

      // Récupérer les informations sur les produits achetés
      const productIds = JSON.parse(session.metadata?.product_id ?? "[]");
      const quantities = JSON.parse(session.metadata?.quantity ?? "[]");

      // Mise à jour du stock et enregistrement de l'achat
      await updateStockAndRecordPurchase(
        clerkUserId,
        productIds,
        quantities,
        customerEmail
      );

      return NextResponse.json({ success: true, paymentStatus });
    }
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json(
      { error: "Error processing the request" },
      { status: 500 }
    );
  }
}

async function updateStockAndRecordPurchase(
  userId: string | undefined,
  productIds: string[],
  quantities: number[],
  userEmail: string
) {
  // Mise à jour du stock et enregistrement de l'achat
  for (let i = 0; i < productIds.length; i++) {
    const productId = productIds[i];
    const quantity = quantities[i];

    if (typeof quantity !== "number" || quantity <= 0) {
      continue; // Ignore les quantités invalides
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
          clerkId: userId || "guest",
          originalId: productId,
          quantity: quantity,
          totalPrice: product.price * quantity,
          email: userEmail,
        },
      });

      // Envoyer un e-mail de confirmation
      const emailContent = `
        <h1>Merci pour votre achat !</h1>
        <p>Vous avez acheté ${quantity} exemplaire(s) de ${product.title}.</p>
        <p>Total: ${product.price * quantity} €</p>
      `;
      await sendEmail(userEmail, "Confirmation d'achat", emailContent);
    }
  }
}
