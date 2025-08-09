import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/order", "/profile"];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Cek apakah rute dilindungi
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  const token = request.cookies.get("token")?.value;

  if (isProtected) {
    if (!token) {
      // Simpan URL asal (termasuk query params) untuk redirect setelah login
      const returnUrl = encodeURIComponent(`${pathname}${search}`);
      const loginUrl = new URL(`/login?returnUrl=${returnUrl}`, request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Validasi token dengan memanggil API
    try {
      const response = await fetch(`https://angkutin.vercel.app/v1/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Token tidak valid, hapus cookie dan redirect ke login
        const loginUrl = new URL(`/login`, request.url);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      console.error("Token validation error:", error);
      const loginUrl = new URL(`/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/order/:path*"],
};
