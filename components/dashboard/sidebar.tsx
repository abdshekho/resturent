"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Menu, Package, ShoppingCart, BarChart3, Settings, QrCode, Users, ChevronLeft, ChevronRight, DoorOpen } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "../auth/auth-provider"
import { Button } from "../ui/button"



export function DashboardSidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { language } = useLanguage()
  const { user, logout } = useAuth()

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
    {
      name: t("qr"),
      href: "/dashboard/qr",
      icon: QrCode,
    },
  ]

  return (
    <div className={ cn(
      "flex h-full flex-col bg-card  transition-all duration-300 relative",
      isCollapsed ? "w-16" : "w-64",
      language === 'ar' ? 'border-l' : 'border-r'
    ) }>
      {/* Logo */ }
      <div className="flex h-16 items-center gap-2 px-6 border-b">
        <QrCode className="h-8 w-8 text-primary" />
        { !isCollapsed && (
          <div>
            <span className="text-lg font-bold text-foreground">مطعم الأصالة</span>
            <p className="text-xs text-muted-foreground">لوحة التحكم</p>
          </div>
        ) }
        <button
          onClick={ () => setIsCollapsed(!isCollapsed) }
          className={ cn("ml-auto p-3 rounded-full absolute  top-[50%] bg-card", language === 'ar' ? 'left-[-18px] border-l-2' : 'right-[-18px] border-r-2') }
        >
          { language === 'ar' ?
            !isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" /> :
            isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" /> }
          { }
        </button>
      </div>

      {/* Navigation */ }
      <nav className={ cn("flex-1 space-y-1", isCollapsed ? "p-1 md:p-2" : "p-4") }>
        { navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={ item.name }
              href={ item.href }
              className={ cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                isCollapsed && "justify-center"
              ) }
              title={ isCollapsed ? item.name : undefined }
            >
              <item.icon className="h-5 w-5" />
              { !isCollapsed && item.name }
            </Link>
          )
        }) }
      </nav>

      {/* QR Code Link & Theme Toggle */ }
      <div className="p-4 border-t space-y-2">
        {/* <Link
          href="/dashboard/qr"
          className={ cn(
            "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
          ) }
          title={ "عرض رمز QR" }
        >
          <QrCode className="h-4 w-4" />
          { !isCollapsed && "عرض رمز QR" }
        </Link> */}


          <div className="flex items-center justify-between">
            { !isCollapsed && <span className="text-sm text-muted-foreground">{ t("theme") }</span> }
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between">
            { !isCollapsed && <span className="text-sm text-muted-foreground">{ t("language") }</span> }
            <LanguageToggle />
          </div>


      </div>
      <div className="p-4 border-t space-y-2">
        <div className="flex items-center justify-between">
          { !isCollapsed && <span className="text-sm text-muted-foreground">{ t("logout") }</span> }
          <Button
            variant="ghost"
            size="icon"
            className="border-1 border-red-300"
            onClick={ logout }
            title={ t("logout") }
          >
            <DoorOpen className="text-red-300" />
          </Button>
        </div>
      </div>
    </div>
  )
}
