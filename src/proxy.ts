import { NextResponse, type NextRequest } from "next/server";
import {
  ROUTES,
  isAdminRoute,
  isGuestOnlyRoute,
  isUserRoute,
} from "./lib/route-config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  let role: string | null = null;

  if (token) {
    try {
      const payloadBase64 = token.split(".")[1];
      const normalizedBase64 = payloadBase64
        .replace(/-/g, "+")
        .replace(/_/g, "/");
      role = JSON.parse(atob(normalizedBase64)).role;
    } catch (error) {
      console.error("Failed to decode token in middleware");
    }
  }

  if (isGuestOnlyRoute(pathname) && role) {
    const dashboard =
      role === "ADMIN" ? ROUTES.adminDashboard : ROUTES.userDashboard;
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  if (!role && (isAdminRoute(pathname) || isUserRoute(pathname))) {
    return NextResponse.redirect(new URL(ROUTES.login, request.url));
  }

  if (role === "USER" && isAdminRoute(pathname)) {
    return NextResponse.redirect(new URL(ROUTES.userDashboard, request.url));
  }

  if (role === "ADMIN" && isUserRoute(pathname)) {
    return NextResponse.redirect(new URL(ROUTES.adminDashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
