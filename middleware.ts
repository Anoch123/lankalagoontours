import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("sb-mkwcixirujhsujkgvugd-auth-token")?.value;

  const { pathname } = request.nextUrl;

  const isLogin = pathname === "/lankalagoon-admin";
  const isAdmin = pathname.startsWith("/lankalagoon-admin/dashboard");

  if (isLogin && token) {
    return NextResponse.redirect(
      new URL("/lankalagoon-admin/dashboard", request.url)
    );
  }

  if (isAdmin && !token) {
    return NextResponse.redirect(
      new URL("/lankalagoon-admin", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/lankalagoon-admin/:path*"],
};