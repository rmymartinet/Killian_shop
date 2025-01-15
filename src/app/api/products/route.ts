import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;
  try {
    return { message: JSON.stringify(maybeError) };
  } catch {
    return { message: String(maybeError) };
  }
}
function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

//Permet de forcer le chargement dynamique des pages pour afficher les changements de la base de données en temps réel
export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const pantsData = await prisma.pants.findMany();
    const shirtsData = await prisma.shirts.findMany();
    const combinedData = [...pantsData, ...shirtsData];

    return new NextResponse(JSON.stringify(combinedData), {
      status: 200,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Database connection error")
    ) {
      return new NextResponse(
        JSON.stringify({ error: "Database connection error" }),
        { status: 500 }
      );
    }

    // Pour toute autre erreur, renvoie un message d'erreur générique
    const message = getErrorMessage(error);
    return new NextResponse(JSON.stringify({ error: message }), {
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    const item = await req.json();

    let data;

    if (item.category === "pants") {
      data = await prisma.pants.create({
        data: item,
      });
    } else if (item.category === "shirts") {
      data = await prisma.shirts.create({
        data: item,
      });
    }

    return new NextResponse(JSON.stringify(data), { status: 201 });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Database connection error")
    ) {
      return new NextResponse(
        JSON.stringify({ error: "Database connection error" }),
        { status: 500 }
      );
    }

    // Pour toute autre erreur, renvoie un message d'erreur générique
    const message = getErrorMessage(error);
    return new NextResponse(JSON.stringify({ error: message }), {
      status: 500,
    });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { id } = await req.json();

    const data = await prisma.pants.delete({
      where: {
        id: id,
      },
    });
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Database connection error")
    ) {
      return new NextResponse(
        JSON.stringify({ error: "Database connection error" }),
        { status: 500 }
      );
    }

    // Pour toute autre erreur, renvoie un message d'erreur générique
    const message = getErrorMessage(error);
    return new NextResponse(JSON.stringify({ error: message }), {
      status: 500,
    });
  }
};

export const PUT = async (req: Request) => {
  try {
    const { id, title, price, quantity } = await req.json();

    const updatedItem = await prisma.pants.update({
      where: { id },
      data: {
        title,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
      },
    });

    return new NextResponse(JSON.stringify(updatedItem), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Erreur lors de la mise à jour de l'article" }),
      { status: 500 }
    );
  }
};
