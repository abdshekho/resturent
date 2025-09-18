import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get("host") || ""

  // Extract subdomain
  const parts = hostname.split(".")
  let subdomain = null
  
  if (hostname.includes("localhost")) {
    // For localhost: subdomain.localhost:port
    subdomain = parts.length >= 2 && parts[0] !== "localhost" ? parts[0] : null
  } else {
    // For production: subdomain.domain.com
    subdomain = parts.length > 2 ? parts[0] : null
  }
  
  console.log('Middleware:', { hostname, parts, subdomain, pathname: url.pathname })

  // For development, check if hostname has subdomain pattern
  const isLocalhost = hostname.includes("localhost") || hostname.includes("127.0.0.1")
  
  // Skip middleware for localhost without subdomain
  if (isLocalhost && !subdomain) {
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

  // If subdomain exists, rewrite to menu page
  if (subdomain && subdomain !== "www") {
    url.pathname = `/menu/${subdomain}`
    return NextResponse.rewrite(url)
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
