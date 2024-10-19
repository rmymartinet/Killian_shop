// /api/users route
import { upsertUser } from "@/lib/users";
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

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const user = await upsertUser(data);
    return NextResponse.json(user, { status: 200 });
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

    const message = getErrorMessage(error);
    return new NextResponse(JSON.stringify({ error: message }), {
      status: 500,
    });
  }
}
