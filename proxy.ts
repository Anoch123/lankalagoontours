import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const tokenName = process.env.SUPABASE_TOKEN_NAME;

  if (!tokenName) {
    return NextResponse.next();
  }

  const token = request.cookies.get(tokenName)?.value;

  const { pathname } = request.nextUrl;

  const isLogin = pathname === "/admin";
  const isAdmin = pathname.startsWith("/admin/dashboard");

  if (isLogin && token) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", request.url)
    );
  }

  if (isAdmin && !token) {
    return NextResponse.redirect(
      new URL("/admin", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};