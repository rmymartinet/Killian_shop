import { Data } from "@/types/dataTypes";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface StripeProduct {
  id: string;
  name: string;
  active: boolean;
}

async function getActiveProducts() {
  const stripeProducts = await stripe.products.list();
  const activeProducts = stripeProducts.data.filter(
    (item: StripeProduct) => item.active === true
  );
  return activeProducts;
}

export async function POST(request: NextRequest) {
  try {
    const { products, userId, deliveryCost } = await request.json();
    const checkoutProducts: Data[] = products;
    const activeProducts = await getActiveProducts();

    const checkoutStripeProducts: Stripe.Checkout.SessionCreateParams.LineItem[] =
      []; // Type défini ici

    for (const product of checkoutProducts) {
      const stripeProduct = activeProducts.find(
        (stripeProduct: StripeProduct) =>
          stripeProduct.name.toLowerCase() === product.title.toLowerCase()
      );

      if (stripeProduct) {
        // Vérifier si default_price est défini et est une chaîne
        if (typeof stripeProduct.default_price === "string") {
          checkoutStripeProducts.push({
            price: stripeProduct.default_price, // On passe l'ID du prix
            quantity: product.quantity,
          });
        } else {
          console.error(`Prix non défini pour : ${product.title}`);
          return NextResponse.json(
            {
              error: `Prix non défini pour ${product.title}`,
            },
            { status: 400 }
          );
        }
      } else {
        const unitAmount = Math.round((product.price || 0) * 100);
        const prod = await stripe.products.create({
          name: product.title,
          default_price_data: {
            unit_amount: unitAmount,
            currency: "eur",
          },
          images: [product.imageUrls[0]],
        });

        // Assurez-vous que prod.default_price est une chaîne
        if (typeof prod.default_price === "string") {
          checkoutStripeProducts.push({
            price: prod.default_price, // On passe l'ID du prix
            quantity: product.quantity,
          });
        } else {
          console.error(
            `Prix non défini pour le produit créé : ${product.title}`
          );
          return NextResponse.json(
            {
              error: `Erreur lors de la création du produit : ${product.title}`,
            },
            { status: 500 }
          );
        }
      }
    }

    // Création de la session de paiement
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const productIds = products.map((product: Data) => product.id);
    const quantity = products.map((product: Data) => product.quantity);
    // Convertir finalAmount en centimes
    const deliveryPrice = Math.round(deliveryCost * 100);

    checkoutStripeProducts.push({
      price_data: {
        currency: "eur",
        product_data: {
          name: "Livraison",
        },
        unit_amount: deliveryPrice,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: checkoutStripeProducts,
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel?session_id={CHECKOUT_SESSION_ID}`,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
      metadata: {
        product_id: JSON.stringify(productIds),
        user_id: userId,
        quantity: JSON.stringify(quantity),
      },
    });

    console.log("Metadata sent:", {
      product_ids: JSON.stringify(productIds),
      user_id: userId,
      quantity: JSON.stringify(quantity),
    });

    // Retourner l'URL pour rediriger l'utilisateur vers Stripe Checkout
    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Erreur lors de la création de la session :", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session" },
      { status: 500 }
    );
  }
}
