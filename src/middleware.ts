import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/admin(/.*)?"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // Appel à l'API Clerk pour récupérer l'utilisateur
    const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
    const res = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const user = await res.json();
    const email = user.email_addresses?.[0]?.email_address;
    const role = user.public_metadata?.role;

    if (
      email !== "remymartin.bk@gmail.com" &&
      role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return undefined;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
