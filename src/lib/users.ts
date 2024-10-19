import prisma from "@/lib/prisma";
import { User } from "@/types/dataTypes";

export async function upsertUser({
  email,
  addressLine1,
  addressLine2,
  addressCity,
  addressState,
  addressPostalCode,
  addressCountry,
}: User) {
  if (!email) throw new Error("Email requis");

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    // Créer un nouvel utilisateur
    user = await prisma.user.create({
      data: {
        email,
        addressLine1,
        addressLine2,
        addressCity,
        addressState,
        addressPostalCode,
        addressCountry,
      },
    });
  } else {
    // Mettre à jour les informations de l'utilisateur
    user = await prisma.user.update({
      where: { email },
      data: {
        addressLine1,
        addressLine2,
        addressCity,
        addressState,
        addressPostalCode,
        addressCountry,
      },
    });
  }

  return user;
}

export async function existingUser({ email }: { email: string }) {
  if (!email) throw new Error("Email requis");

  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
}
