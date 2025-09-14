import { headers } from "next/headers"

export function getSubdomain(): string | null {
  const headersList = headers()
  const host = headersList.get("host") || ""

  // Skip subdomain detection for localhost and development
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return null
  }

  // Extract subdomain from host
  const parts = host.split(".")

  // If we have more than 2 parts (subdomain.domain.com), return the first part
  if (parts.length > 2) {
    const subdomain = parts[0]

    // Skip common subdomains
    if (subdomain === "www" || subdomain === "api" || subdomain === "admin") {
      return null
    }

    return subdomain
  }

  return null
}

export function isSubdomain(): boolean {
  return getSubdomain() !== null
}

export function getMainDomain(): string {
  const headersList = headers()
  const host = headersList.get("host") || ""

  const parts = host.split(".")

  // Return the main domain (last two parts)
  if (parts.length > 2) {
    return parts.slice(-2).join(".")
  }

  return host
}

export function getSubdomainUrl(subdomain: string, path = ""): string {
  const mainDomain = getMainDomain()
  const protocol = typeof window !== "undefined" ? window.location.protocol : "https:"

  return `${protocol}//${subdomain}.${mainDomain}${path}`
}

export function isValidSubdomain(subdomain: string): boolean {
  // Check if subdomain contains only valid characters
  const validPattern = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/

  // Check length (3-63 characters)
  if (subdomain.length < 3 || subdomain.length > 63) {
    return false
  }

  return validPattern.test(subdomain)
}
