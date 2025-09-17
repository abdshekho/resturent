"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Menu, Package, ShoppingCart, BarChart3, Settings, QrCode, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"



export function DashboardSidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigation = [
    {
      name: t("dashboard"),
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: t("menu"),
      href: "/dashboard/menu",
      icon: Menu,
    },
    {
      name: t("categories"),
      href: "/dashboard/categories",
      icon: Package,
    },
    {
      name: t("orders"),
      href: "/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      name: t("analytics"),
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      name: t("staff"),
      href: "/dashboard/staff",
      icon: Users,
    },
    {
      name: t("settings"),
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <div className={cn(
      "flex h-full flex-col bg-card border-l transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6 border-b">
        <QrCode className="h-8 w-8 text-primary" />
        {!isCollapsed && (
          <div>
            <span className="text-lg font-bold text-foreground">مطعم الأصالة</span>
            <p className="text-xs text-muted-foreground">لوحة التحكم</p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto p-1 rounded hover:bg-muted"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className={cn("flex-1 space-y-1",isCollapsed ? "p-1 md:p-2" : "p-4")}>
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
                isCollapsed && "justify-center"
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && item.name}
            </Link>
          )
        })}
      </nav>

      {/* QR Code Link & Theme Toggle */}
      <div className="p-4 border-t space-y-2">
        <Link
          href="/dashboard/qr"
          className={cn(
            "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
            isCollapsed && "justify-center"
          )}
          title={isCollapsed ? "عرض رمز QR" : undefined}
        >
          <QrCode className="h-4 w-4" />
          {!isCollapsed && "عرض رمز QR"}
        </Link>
        {!isCollapsed && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t("theme")}</span>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t("language")}</span>
              <LanguageToggle />
            </div>
          </>
        )}
        {isCollapsed && (
          <div className="flex flex-col items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        )}
      </div>
    </div>
  )
}
