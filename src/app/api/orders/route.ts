import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getAuth } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(req: NextRequest) {
  const { userId, sessionClaims } = getAuth(req);
  const email = sessionClaims?.email;

  if (!email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // Recherche des paiements Stripe par email
  const payments = await stripe.paymentIntents.list({
    limit: 10,
    expand: ['data.charges'],
  });

  // Filtrer les paiements par email du client
  const userPayments = payments.data.filter(
    (p) => {
      const pi = p as Stripe.PaymentIntent & { charges: Stripe.ApiList<Stripe.Charge> };
      return pi.charges.data[0]?.billing_details?.email === email;
    }
  );

  // Formater la réponse
  const orders = userPayments.map((p) => ({
    id: p.id,
    amount: p.amount / 100,
    date: new Date(p.created * 1000).toLocaleDateString(),
    status: p.status,
  }));

  return NextResponse.json({ orders });
}
