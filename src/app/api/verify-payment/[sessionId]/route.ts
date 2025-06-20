import prisma from "@/lib/prisma";
import { upsertUser } from "@/lib/users";
import { CustomerAddress } from "@/types/dataTypes";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20", // Version la plus récente de l'API
  typescript: true,
});

// Schéma de validation pour l'adresse
const AddressSchema = z.object({
  line1: z.string().nullable(),
  line2: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  postal_code: z.string().nullable(),
  country: z.string().nullable(),
});

interface Params {
  sessionId: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { sessionId } = params;

  if (!sessionId?.startsWith('cs_')) {
    return NextResponse.json(
      { error: "Invalid Session ID format" },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer_details', 'line_items']
    });

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    const paymentStatus = session.payment_status;
    if (paymentStatus !== "paid") {
      return NextResponse.json({
        success: false,
        message: "Payment not completed",
        status: paymentStatus
      }, { status: 400 });
    }

    const customerEmail = session.customer_details?.email;
    if (!customerEmail) {
      return NextResponse.json(
        { error: "Customer email is required" },
        { status: 400 }
      );
    }

    // Validation de l'adresse
    const addressValidation = AddressSchema.safeParse(session.customer_details?.address || {});
    if (!addressValidation.success) {
      console.error("Invalid address format:", addressValidation.error);
      return NextResponse.json(
        { error: "Invalid address format" },
        { status: 400 }
      );
    }

    const customerAddress: CustomerAddress = addressValidation.data;

    // Validation et parsing des métadonnées
    let productIds: string[] = [];
    let quantities: number[] = [];
    
    try {
      productIds = session.metadata?.product_id ? JSON.parse(session.metadata.product_id) : [];
      quantities = session.metadata?.quantity ? JSON.parse(session.metadata.quantity) : [];
      
      if (!Array.isArray(productIds) || !Array.isArray(quantities)) {
        throw new Error("Invalid metadata format");
      }
      
      if (productIds.length !== quantities.length) {
        throw new Error("Product IDs and quantities mismatch");
      }
    } catch (error) {
      console.error("Error parsing metadata:", error);
      return NextResponse.json(
        { error: "Invalid order metadata" },
        { status: 400 }
      );
    }

    // Utilisation d'une transaction pour garantir l'atomicité
    try {
      await prisma.$transaction(async (tx) => {
        await updateStockAndRecordPurchase(
          tx,
          productIds,
          quantities,
          customerEmail,
          customerAddress
        );

        const user = await tx.user.findUnique({
          where: { email: customerEmail },
        });

        if (user) {
          await upsertUser({
            email: customerEmail,
            addressLine1: customerAddress.line1 ?? "",
            addressLine2: customerAddress.line2 ?? "",
            addressCity: customerAddress.city ?? "",
            addressState: customerAddress.state ?? "",
            addressPostalCode: customerAddress.postal_code ?? "",
            addressCountry: customerAddress.country ?? "",
          });
        }
      });

      return NextResponse.json({
        success: true,
        message: "Payment processed successfully",
        customerEmail,
        orderDetails: {
          productIds,
          quantities,
        }
      });
    } catch (error) {
      console.error("Transaction error:", error);
      return NextResponse.json(
        { error: "Failed to process order" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Stripe API error:", error);
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function updateStockAndRecordPurchase(
  tx: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">,
  productIds: string[],
  quantities: number[],
  userEmail: string,
  customerAddress: CustomerAddress
) {
  for (let i = 0; i < productIds.length; i++) {
    const productId = productIds[i];
    const quantity = quantities[i];

    if (typeof quantity !== "number" || quantity <= 0) {
      throw new Error(`Invalid quantity for product ${productId}`);
    }

    // Vérifier d'abord le stock disponible
    const currentProduct = await tx.pants.findUnique({
      where: { id: productId },
      select: { quantity: true, price: true }
    });

    if (!currentProduct) {
      throw new Error(`Product ${productId} not found`);
    }

    if (currentProduct.quantity < quantity) {
      throw new Error(`Insufficient stock for product ${productId}`);
    }

    // Mise à jour du stock
    await tx.pants.update({
      where: { id: productId },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });

    // Enregistrement de l'achat
    await tx.purchase.create({
      data: {
        originalId: productId,
        quantity: quantity,
        totalPrice: currentProduct.price * quantity,
        email: userEmail,
        addressLine1: customerAddress.line1 ?? "",
        addressLine2: customerAddress.line2 ?? "",
        addressCity: customerAddress.city ?? "",
        addressState: customerAddress.state ?? "",
        addressPostalCode: customerAddress.postal_code ?? "",
        addressCountry: customerAddress.country ?? "",
      },
    });
  }
}
