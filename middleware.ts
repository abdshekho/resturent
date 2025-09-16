import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get("host") || ""
  const parts = hostname.split(".")

  // استخراج subdomain
  const isLocal = hostname.includes("localhost") || hostname.includes("127.0.0.1")
  const subdomain = isLocal
    ? (parts[0] !== "localhost" ? parts[0] : null)
    : (parts.length > 2 ? parts[0] : null)

  // ✅ routes اللي ما بدنا نمرر عليها middleware
  const skipRoutes = [
    "/super-admin",
    "/dashboard",
    "/api",
    "/_next",
    "/favicon.ico",
  ]

  if (skipRoutes.some((r) => url.pathname.startsWith(r)) || url.pathname.includes(".")) {
    return NextResponse.next()
  }

  if (subdomain && subdomain !== "www") {
    url.pathname = `/menu/${subdomain}`
    return NextResponse.rewrite(url)
  }

  // ✅ إذا ما في subdomain وحاول يدخل على /menu → رجع للـ /
  if (!subdomain && url.pathname.startsWith("/menu")) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
