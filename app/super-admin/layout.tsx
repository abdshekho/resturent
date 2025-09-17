import type React from "react"
import ProtectedRoute from "@/components/auth/protected-route"
import { SuperAdminSidebar } from "@/components/super-admin/sidebar"

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requiredUserType="super-admin">
      <div className="min-h-screen bg-background">
        <div className="flex h-screen bg-background">
                <SuperAdminSidebar />
        {children}
        </div>
        </div>
    </ProtectedRoute>
  )
}
