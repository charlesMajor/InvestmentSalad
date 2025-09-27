import { NextRequest, NextResponse } from "next/server";
import { isTokenInCookiesValid } from "@/lib/managers/tokenManager";

export const publicRoutes = ["/"];
export const authRoutes = ["/login", "/signup"];
export const protectedRoutes = ["/app"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoggedIn = await isTokenInCookiesValid();

  const defaultPath = isLoggedIn ? "/app/dashboard" : "/login";

  if ((isLoggedIn && authRoutes.includes(pathname)) || pathname == "/app") {
    return NextResponse.redirect(new URL(defaultPath, req.url));
  }

  if (!authRoutes.includes(pathname) && !publicRoutes.includes(pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL(defaultPath, req.url));
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
