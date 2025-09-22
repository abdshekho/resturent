"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2 } from "lucide-react"

interface LoginFormProps {
  userType: "super-admin" | "restaurant-admin"
}

export default function LoginForm({ userType }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          userType,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))

        // Redirect based on user type
        if (userType === "super-admin") {
          router.push("/super-admin")
        } else if (userType === "restaurant-admin") {
          router.push("/dashboard")
        }
      } else {
        setError(data.message || "حدث خطأ في تسجيل الدخول")
      }
    } catch (error) {
      setError("حدث خطأ في الاتصال بالخادم")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-emerald-800">
            { userType === "super-admin" ? "تسجيل دخول المدير العام" : "تسجيل دخول المطعم" }
          </CardTitle>
          <CardDescription>
            { userType === "super-admin"
              ? "ادخل بياناتك للوصول إلى لوحة التحكم الرئيسية"
              : "ادخل بياناتك للوصول إلى لوحة تحكم المطعم" }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={ handleSubmit } className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
                required
                className="text-right"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={ showPassword ? "text" : "password" }
                  value={ password }
                  onChange={ (e) => setPassword(e.target.value) }
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={ () => setShowPassword(!showPassword) }
                >
                  { showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  ) }
                </Button>
              </div>
            </div>

            { error && (
              <Alert variant="destructive">
                <AlertDescription>{ error }</AlertDescription>
              </Alert>
            ) }

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={ isLoading }>
              { isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                "تسجيل الدخول"
              ) }
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
