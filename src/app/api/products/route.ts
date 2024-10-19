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
    const data = await prisma.pants.findMany();
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
