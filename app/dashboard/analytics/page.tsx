"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react"

interface AnalyticsData {
  totalOrders: number
  totalRevenue: number
  totalCustomers: number
  popularItems: Array<{ name: string; count: number }>
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    popularItems: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('/api/analytics', {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        })

        if (response.ok) {
          const data = await response.json()
          setAnalytics(data)
        }
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen bg-background">
        <DashboardSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">جاري تحميل التحليلات...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">التحليلات والإحصائيات</h1>
            <p className="text-muted-foreground">نظرة عامة على أداء المطعم</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalOrders}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalRevenue} ر.س</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">العملاء</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalCustomers}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">معدل النمو</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12%</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>الأطباق الأكثر طلباً</CardTitle>
            </CardHeader>
            <CardContent>
              {analytics.popularItems.length > 0 ? (
                <div className="space-y-4">
                  {analytics.popularItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-muted-foreground">{item.count} طلب</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">لا توجد بيانات متاحة</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}