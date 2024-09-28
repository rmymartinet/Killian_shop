import { NextResponse } from "next/server";
import stripeLib from "stripe";

const stripe = new stripeLib(process.env.STRIPE_SECRET_KEY || "");

export async function POST(request: Request) {
  const { amount, productName } = await request.json(); // Récupérer les données du corps de la requête

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: productName || "Produit sans nom",
            },
            unit_amount: amount * 100, // Ajout de la virgule ici
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
      success_url:
        "http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/payment-cancel",
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return NextResponse.error(); // Renvoie une erreur générique
  }
}
