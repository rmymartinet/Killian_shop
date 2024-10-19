import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { email } = await req.json(); // Utiliser await pour extraire le corps de la requête

  if (!email) {
    return new Response(JSON.stringify({ error: "Email requis" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Retourner un objet JSON avec une clé "exists" qui indique si l'utilisateur existe
    return new Response(JSON.stringify({ exists: !!user }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
