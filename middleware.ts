import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./app/_lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const pathname = request.nextUrl.pathname;

  // User is NOT logged in — protect private routes
  if (!session?.user && ["/checkout", "/account"].includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // User IS logged in — block access to auth routes
  if (session?.user && ["/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout", "/account", "/login", "/signup"],
};