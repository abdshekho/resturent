"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Store, Users, BarChart3, Settings, LogOut, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  {
    name: "لوحة التحكم",
    href: "/super-admin",
    icon: LayoutDashboard,
  },
  {
    name: "المطاعم",
    href: "/super-admin/restaurants",
    icon: Store,
  },
  {
    name: "المستخدمين",
    href: "/super-admin/users",
    icon: Users,
  },
  {
    name: "التقارير",
    href: "/super-admin/analytics",
    icon: BarChart3,
  },
  {
    name: "الإعدادات",
    href: "/super-admin/settings",
    icon: Settings,
  },
]

export function SuperAdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-card border-l">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6 border-b">
        <QrCode className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold text-foreground">RestaurantOS</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
          <LogOut className="ml-3 h-5 w-5" />
          تسجيل الخروج
        </Button>
      </div>
    </div>
  )
}
