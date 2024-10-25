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
    const { products, currentUserEmail, deliveryCost } = await request.json();
    const checkoutProducts: Data[] = products;
    const activeProducts = await getActiveProducts();
    const checkoutStripeProducts: Stripe.Checkout.SessionCreateParams.LineItem[] =
      [];

    for (const product of checkoutProducts) {
      const stripeProduct = activeProducts.find(
        (stripeProduct: StripeProduct) =>
          stripeProduct.name.toLowerCase() === product.title.toLowerCase()
      );

      if (stripeProduct) {
        if (typeof stripeProduct.default_price === "string") {
          checkoutStripeProducts.push({
            price: stripeProduct.default_price,
            quantity: product.quantity,
          });
        } else {
          return NextResponse.json(
            { error: `Prix non défini pour ${product.title}` },
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

        if (typeof prod.default_price === "string") {
          checkoutStripeProducts.push({
            price: prod.default_price,
            quantity: product.quantity,
          });
        } else {
          return NextResponse.json(
            {
              error: `Erreur lors de la création du produit : ${product.title}`,
            },
            { status: 500 }
          );
        }
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const productIds = products.map((product: Data) => product.id);
    const quantity = products.map((product: Data) => product.quantity);
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
      customer_email: currentUserEmail,
      billing_address_collection: "required",
      customer_creation: "always",
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
      metadata: {
        product_id: JSON.stringify(productIds),
        quantity: JSON.stringify(quantity),
        customer_email: currentUserEmail,
      },
    });

    // Log des metadata uniquement en mode développement
    if (process.env.NODE_ENV === "development") {
      console.log("Metadata sent:", {
        product_id: JSON.stringify(productIds),
        quantity: JSON.stringify(quantity),
      });
    }

    return NextResponse.json({
      url: session.url,
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la création de la session" },
      { status: 500 }
    );
  }
}
