import {  NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    
    const { userId } = auth();
    
    
    if (!userId) {
      return NextResponse.json({ error: "Non autorisé - userId manquant" }, { status: 401 });
    }

       // Appel à l'API Clerk pour récupérer l'utilisateur
       const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
       const res = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
         headers: {
           Authorization: `Bearer ${CLERK_SECRET_KEY}`,
           "Content-Type": "application/json",
         },
       });

    const user = await res.json();
    const userEmail = user.email_addresses?.[0]?.email_address;
    
    
    if (!userEmail) {
      return NextResponse.json({ error: "Email non trouvé" }, { status: 400 });
    }

    // Récupérer les commandes de l'utilisateur connecté
    const orders = await prisma.purchase.findMany({
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


    return NextResponse.json({ 
      orders,
      total: orders.length
    });

  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur", details: error instanceof Error ? error.message : "Erreur inconnue" },
      { status: 500 }
    );
  }
}