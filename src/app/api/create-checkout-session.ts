import { NextApiRequest, NextApiResponse } from "next";

import stripeLib from "stripe";
const stripe = stripeLib(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { amount, productName } = req.body;
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
          "http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:5173/payment-cancel",
      });
      res.json({ url: session.url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
