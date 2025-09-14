import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface AuthUser {
  userId: string
  email: string
  userType: "super-admin" | "restaurant-admin"
  restaurantId?: string
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser
    return decoded
  } catch (error) {
    return null
  }
}

export function getAuthUser(request: NextRequest): AuthUser | null {
  const token = request.headers.get("authorization")?.replace("Bearer ", "")

  if (!token) {
    return null
  }

  return verifyToken(token)
}

export function requireAuth(userType?: "super-admin" | "restaurant-admin") {
  return (handler: Function) =>
    async (request: NextRequest, ...args: any[]) => {
      const user = getAuthUser(request)

      if (!user) {
        return new Response(JSON.stringify({ message: "غير مصرح" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        })
      }

      if (userType && user.userType !== userType) {
        return new Response(JSON.stringify({ message: "غير مصرح" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        })
      }
      // Add user to request context
      ;(request as any).user = user

      return handler(request, ...args)
    }
}
