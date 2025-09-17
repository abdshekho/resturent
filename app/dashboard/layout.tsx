import type React from "react"
import ProtectedRoute from "@/components/auth/protected-route"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requiredUserType="restaurant-admin">
      <div className="min-h-screen bg-background">
        <div className="flex h-screen bg-background">
          <DashboardSidebar />
          { children }
        </div>
      </div>
    </ProtectedRoute>
  )
}
