import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  console.log("Recherche de l'utilisateur avec l'ID:", userId);

  // Nettoyer l'ID utilisateur
  const cleanedUserId = userId.trim();

  try {
    // Vérifier si l'utilisateur existe déjà dans la base de données
    let user = await prisma.user.findUnique({
      where: { clerkId: cleanedUserId },
    });

    // Si l'utilisateur n'existe pas, le créer
    if (!user) {
      console.log(
        "Utilisateur non trouvé, création d'un nouvel utilisateur..."
      );
      // Récupérer les détails supplémentaires de l'utilisateur via Clerk
      const currentUserDetails = await currentUser();

      // Extraire les informations nécessaires
      const email =
        currentUserDetails?.emailAddresses[0]?.emailAddress ||
        "inconnu@example.com";

      // Créer un nouvel utilisateur dans la base de données
      user = await prisma.user.create({
        data: {
          clerkId: cleanedUserId,
          email: email,
          name: currentUserDetails?.fullName,
          image: currentUserDetails?.imageUrl,
        },
      });

      console.log("Nouvel utilisateur créé:", user);
    } else {
      console.log("Utilisateur existant:", user);
    }

    // Retourner l'utilisateur trouvé ou créé
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(
      "Erreur lors de la vérification/ajout de l'utilisateur:",
      error
    );
    return NextResponse.json(
      { error: "Erreur lors de la récupération ou création de l'utilisateur" },
      { status: 500 }
    );
  }
}
