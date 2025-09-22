"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { OrdersManagement } from "@/components/dashboard/orders-management"
import type { IOrder } from "@/lib/models/mongoose"

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingStatus, setLoadingStatus] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token')
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {}

        const response = await fetch('/api/dashboard/orders', { headers })
        
        if (response.ok) {
          const ordersData = await response.json()
          setOrders(ordersData)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    setLoadingStatus(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/dashboard/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ status })
      })

      if (response.ok) {
        setOrders(prev => prev.map(order => 
          order._id?.toString() === orderId ? { ...order, status } : order
        ))
      }
    } catch (error) {
      console.error('Error updating order status:', error)
    }
    setLoadingStatus(false)
  }

  if (loading) {
    return (
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">جاري تحميل الطلبات...</p>
          </div>
        </main>
    )
  }

  return (
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">إدارة الطلبات</h1>
            <p className="text-muted-foreground">متابعة وإدارة طلبات العملاء</p>
          </div>

          <OrdersManagement
            orders={orders}
            loadingStatus={loadingStatus}
            setLoadingStatus={setLoadingStatus}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        </div>
      </main>
  )
}