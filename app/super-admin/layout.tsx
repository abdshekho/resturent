import type React from "react"
import ProtectedRoute from "@/components/auth/protected-route"

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requiredUserType="super-admin">
      <div className="min-h-screen bg-background">{children}</div>
    </ProtectedRoute>
  )
}
