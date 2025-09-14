import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get("host") || ""

  // Extract subdomain
  const parts = hostname.split(".")
  const subdomain = parts.length > 2 ? parts[0] : null

  // Skip middleware for localhost and development
  if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
    return NextResponse.next()
  }

  // Skip middleware for admin routes
  if (url.pathname.startsWith("/super-admin") || url.pathname.startsWith("/dashboard")) {
    return NextResponse.next()
  }

  // Skip middleware for API routes
  if (url.pathname.startsWith("/api")) {
    return NextResponse.next()
  }

  // Skip middleware for static files
  if (url.pathname.startsWith("/_next") || url.pathname.startsWith("/favicon.ico") || url.pathname.includes(".")) {
    return NextResponse.next()
  }

  // If subdomain exists and not on menu page, redirect to menu
  if (subdomain && !url.pathname.startsWith("/menu")) {
    url.pathname = `/menu/${subdomain}`
    return NextResponse.redirect(url)
  }

  // If no subdomain and on menu page, redirect to home
  if (!subdomain && url.pathname.startsWith("/menu")) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
