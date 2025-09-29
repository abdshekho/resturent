"use client"

import type React from "react"

import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  userType: "super-admin" | "restaurant-admin"
  restaurantId?: string
  restaurantName?: string
}

interface AuthContextType {
  user: User | null
  login: (token: string, userData: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isTokenValid = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);


      console.log('🚀 ~ auth-provider.tsx ~ isTokenValid ~ payload.exp:', payload.exp);


      console.log('🚀 ~ auth-provider.tsx ~ isTokenValid ~ currentTime:', currentTime);

      return payload.exp > currentTime;
    } catch {
      return false;
    }
  };

useLayoutEffect(() => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  if (token && userData) {
    try {
      // التحقق من صلاحية التوكن
      if (isTokenValid(token)) {
        setUser(JSON.parse(userData));
      } else {
        // التوكن منتهي - تسجيل خروج تلقائي
        console.warn("Token expired, auto logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        router.push("/login"); // توجيه لصفحة Login
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  setIsLoading(false);
}, [router]);

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  return <AuthContext.Provider value={ { user, login, logout, isLoading } }>{ children }</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  console.log('🚀 ~ auth-provider.tsx ~ useAuth ~ context:', context);

  return context
}
