import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const verified = request.cookies.get("verified")?.value;
  const email = request.cookies.get("userEmail")?.value;
  const paid = request.cookies.get("paid")?.value;
  const role = request.cookies.get("role")?.value;

  // If the user is not an admin and tries to access an admin route, redirect to dashboard
  if (role !== "admin" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the role is admin, allow access to all routes
  if (role === "admin") {
    return NextResponse.next();
  }

  // Existing redirect logic for non-admin users
  if (pathname === "/auth") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (pathname.startsWith("/auth/verify")) {
    if (!email) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (verified === "true") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/signup")
  ) {
    if (email) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (pathname.startsWith("/dashboard")) {
    if (!email) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (verified === "false") {
      return NextResponse.redirect(
        new URL("/auth/verify/login-verification", request.url)
      );
    }
    if (verified === "true" && paid === "false") {
      return NextResponse.redirect(new URL("/auth/payment-means", request.url));
    }
  }

  if (pathname.startsWith("/auth/payment-means")) {
    if (!email) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (verified === "false") {
      return NextResponse.redirect(
        new URL("/auth/verify/login-verification", request.url)
      );
    }
  }

  // Default to continue to the requested page if no conditions are met
  return NextResponse.next();
}

// Export the matcher to specify which paths should be processed by this middleware
export const config = {
  matcher: [
    "/auth",
    "/auth/login",
    "/auth/signup",
    "/auth/verify",
    "/dashboard",
    "/auth/verify/login-verification",
    "/auth/payment-means",
    "/admin/:path*",
  ],
};
