"use client"

import { useState, useEffect } from "react"
import { OrdersManagement } from "@/components/dashboard/orders-management"
import type { IOrder } from "@/lib/models/mongoose"

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month' | 'custom' | 'all'>('today')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalOrders, setTotalOrders] = useState(0)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {}
        const urlParams = new URLSearchParams()
        urlParams.set('page', currentPage.toString())
        urlParams.set('limit', '3')
        
        if (timeFilter === 'custom' && fromDate && toDate) {
          urlParams.set('from', fromDate)
          urlParams.set('to', toDate)
        } else if (timeFilter !== 'all') {
          urlParams.set('filter', timeFilter)
        }
        
        const params = `?${urlParams.toString()}`

        const response = await fetch(`/api/dashboard/orders${params}`, { headers })
        
        if (response.ok) {
          const data = await response.json()
          setOrders(data.orders)
          setTotalPages(data.totalPages)
          setTotalOrders(data.total)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [timeFilter, fromDate, toDate, currentPage])

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
    finally {
      setLoadingStatus(false)
    }
    // setLoadingStatus(false)
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
        <div className="p-2 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">إدارة الطلبات</h1>
            <p className="text-muted-foreground">متابعة وإدارة طلبات العملاء</p>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => { setTimeFilter('all'); setCurrentPage(1) }}
                className={`px-4 py-2 rounded ${timeFilter === 'all' ? 'bg-primary text-white' : 'bg-card'}`}
              >
                جميع الطلبات
              </button>
              <button
                onClick={() => { setTimeFilter('today'); setCurrentPage(1) }}
                className={`px-4 py-2 rounded ${timeFilter === 'today' ? 'bg-primary text-white' : 'bg-card'}`}
              >
                اليوم
              </button>
              <button
                onClick={() => { setTimeFilter('week'); setCurrentPage(1) }}
                className={`px-4 py-2 rounded ${timeFilter === 'week' ? 'bg-primary text-white' : 'bg-card'}`}
              >
                هذا الأسبوع
              </button>
              <button
                onClick={() => { setTimeFilter('month'); setCurrentPage(1) }}
                className={`px-4 py-2 rounded ${timeFilter === 'month' ? 'bg-primary text-white' : 'bg-card'}`}
              >
                هذا الشهر
              </button>
              <button
                onClick={() => { setTimeFilter('custom'); setCurrentPage(1) }}
                className={`px-4 py-2 rounded ${timeFilter === 'custom' ? 'bg-primary text-white' : 'bg-card'}`}
              >
                فترة مخصصة
              </button>
            </div>
            
            {timeFilter === 'custom' && (
              <div className="flex gap-4 mt-4 items-center">
                <div>
                  <label className="block text-sm font-medium mb-1">من تاريخ:</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">إلى تاريخ:</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-muted-foreground">
                إجمالي الطلبات: {totalOrders}
              </p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  السابق
                </button>
                
                <span className="px-3 py-1">
                  {currentPage} من {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  التالي
                </button>
              </div>
            </div>
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