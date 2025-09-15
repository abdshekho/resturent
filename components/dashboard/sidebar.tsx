"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Menu, Package, ShoppingCart, BarChart3, Settings, QrCode, Users } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  {
    name: "لوحة التحكم",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "القائمة",
    href: "/dashboard/menu",
    icon: Menu,
  },
  {
    name: "التصنيفات",
    href: "/dashboard/categories",
    icon: Package,
  },
  {
    name: "الطلبات",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    name: "التقارير",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "الموظفين",
    href: "/dashboard/staff",
    icon: Users,
  },
  {
    name: "الإعدادات",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-card border-l">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6 border-b">
        <QrCode className="h-8 w-8 text-primary" />
        <div>
          <span className="text-lg font-bold text-foreground">مطعم الأصالة</span>
          <p className="text-xs text-muted-foreground">لوحة التحكم</p>
        </div>
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

      {/* QR Code Link & Theme Toggle */}
      <div className="p-4 border-t space-y-2">
        <Link
          href="/dashboard/qr"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <QrCode className="h-4 w-4" />
          عرض رمز QR
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">المظهر</span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
