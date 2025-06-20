import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export async function GET(req: NextRequest) {
  try {
    const { userId, sessionClaims } = getAuth(req);
    
    if (!userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userEmail = sessionClaims?.email as string;
    
    if (!userEmail) {
      return NextResponse.json({ error: "Email non trouvé" }, { status: 400 });
    }

    // Récupérer les commandes de la base de données (Purchase)
    const dbOrders = await prisma.purchase.findMany({
      where: {
        email: userEmail
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        originalId: true,
        quantity: true,
        totalPrice: true,
        email: true,
        addressLine1: true,
        addressLine2: true,
        addressCity: true,
        addressState: true,
        addressPostalCode: true,
        addressCountry: true,
        createdAt: true,
      }
    });

    // Récupérer les commandes Stripe
    let stripeOrders: any[] = [];
    try {
      const payments = await stripe.paymentIntents.list({
        limit: 100,
        expand: ['data.charges'],
      });

      // Filtrer les paiements par email du client
      stripeOrders = payments.data
        .filter((p) => {
          const pi = p as Stripe.PaymentIntent & { charges: Stripe.ApiList<Stripe.Charge> };
          return pi.charges.data[0]?.billing_details?.email === userEmail;
        })
        .map((p) => ({
          id: p.id,
          amount: p.amount / 100,
          status: p.status,
          createdAt: new Date(p.created * 1000).toISOString(),
          source: 'stripe'
        }));
    } catch (stripeError) {
      console.error("Erreur Stripe:", stripeError);
      // On continue même si Stripe échoue
    }

    // Combiner et trier toutes les commandes par date
    const allOrders = [
      ...dbOrders.map(order => ({ ...order, source: 'database' })),
      ...stripeOrders
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ 
      orders: allOrders,
      total: allOrders.length,
      dbOrders: dbOrders.length,
      stripeOrders: stripeOrders.length
    });

  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
} 