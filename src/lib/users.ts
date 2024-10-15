import prisma from "./prisma";

export const addUserToDatabase = async (
  clerkId: string,
  name: string,
  email: string
) => {
  try {
    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {
        name,
        email,
      },
      create: {
        clerkId,
        name,
        email,
      },
    });

    return user;
  } catch (err) {
    console.error("Une erreure lors de la connexion", err);
    throw new Error(`Une erreur lors de la connexion : ${err}`);
  }
};

export const getUserById = async (clerkId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    return user;
  } catch (err) {
    console.error("Une erreur lors de la connexion", err);
    throw new Error(`Une erreur lors de la connexion : ${err}`);
  }
};
