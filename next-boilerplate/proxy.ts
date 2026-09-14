import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  isValidAdminSessionToken,
} from "@/lib/admin-auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = isValidAdminSessionToken(
    request.cookies.get(ADMIN_SESSION_COOKIE)?.value,
  );

  if (pathname.startsWith("/admin/login")) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/users", request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
