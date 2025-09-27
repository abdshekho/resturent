"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, X, QrCode, ChevronDown, User, Shield } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  console.log('🚀 ~ header.tsx ~ Header ~ user:', user);


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <QrCode className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">RestaurantOS</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            الميزات
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            الأسعار
          </Link>
          <Link
            href="#support"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            الدعم
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            من نحن
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle />
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  {user.userType === "super-admin" ? <Shield className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  {user.name}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={user.userType === "super-admin" ? "/super-admin" : "/dashboard"}>لوحة التحكم</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>تسجيل الخروج</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    تسجيل الدخول
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/login/super-admin" className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      المدير العام
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/login/restaurant" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      صاحب المطعم
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/register">
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  ابدأ الآن
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto flex flex-col gap-4 p-4">
            {/* Existing mobile navigation code */}
            <div className="flex items-center justify-between pt-4 border-t mb-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            <div className="flex flex-col gap-2">
              {user ? (
                <>
                  <Link href={user.userType === "super-admin" ? "/super-admin" : "/dashboard"}>
                    <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                      {user.userType === "super-admin" ? <Shield className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      لوحة التحكم
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="w-full justify-start" onClick={logout}>
                    تسجيل الخروج
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login/super-admin">
                    <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                      <Shield className="h-4 w-4" />
                      تسجيل دخول المدير العام
                    </Button>
                  </Link>
                  <Link href="/login/restaurant">
                    <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                      <User className="h-4 w-4" />
                      تسجيل دخول المطعم
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      ابدأ الآن
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
