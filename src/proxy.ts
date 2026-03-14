import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/auctions", "/seller", "/wallet"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // 1. Redirect to Login if no token on protected routes
  if (isProtectedRoute && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  let payload: any = null;

  if (token) {
    try {
      // Verify the JWT token on the server side
      const { payload: verifiedPayload } = await jwtVerify(token, JWT_SECRET);
      payload = verifiedPayload;
    } catch (error) {
      console.error("JWT Verification failed:", error);
      // If verification fails on a protected route, redirect to login
      if (isProtectedRoute) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("token");
        response.cookies.delete("user");
        return response;
      }
    }
  }

  // 2. Role Based Access Control (RBAC) using the verified payload
  if (
    pathname.startsWith("/seller") &&
    (!payload || payload.role !== "SELLER")
  ) {
    return NextResponse.redirect(new URL("/auctions", request.url));
  }

  if (
    pathname.startsWith("/auctions") &&
    (!payload || payload.role !== "BIDDER")
  ) {
    return NextResponse.redirect(new URL("/seller ", request.url));
  }

  // 3. Redirect logged-in users away from auth pages
  const authRoutes = ["/login", "/register"];
  if (authRoutes.includes(pathname) && payload) {
    return NextResponse.redirect(new URL("/auctions", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auctions/:path*",
    "/seller/:path*",
    "/wallet/:path*",
    "/login",
    "/register",
  ],
};
