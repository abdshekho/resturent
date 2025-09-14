"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import type { Order } from "@/lib/models/Company"
import { ObjectId } from "mongodb"

// Mock data - في التطبيق الحقيقي، ستأتي من API
const mockStats = {
  todayOrders: 24,
  todayRevenue: 1850,
  totalCustomers: 156,
  popularItem: "كبسة لحم",
}

const mockOrders: Order[] = [
  {
    _id: new ObjectId(),
    restaurantId: new ObjectId(),
    orderNumber: "ORD-001",
    customerInfo: {
      name: "أحمد محمد",
      phone: "+966501234567",
      tableNumber: "5",
    },
    items: [
      {
        menuItemId: new ObjectId(),
        name: "كبسة لحم",
        price: 45,
        quantity: 1,
      },
      {
        menuItemId: new ObjectId(),
        name: "سلطة فتوش",
        price: 15,
        quantity: 1,
      },
    ],
    subtotal: 60,
    tax: 9,
    total: 69,
    status: "preparing",
    orderType: "dine-in",
    paymentStatus: "paid",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    restaurantId: new ObjectId(),
    orderNumber: "ORD-002",
    customerInfo: {
      name: "فاطمة العلي",
      phone: "+966507654321",
    },
    items: [
      {
        menuItemId: new ObjectId(),
        name: "مندي دجاج",
        price: 35,
        quantity: 2,
      },
    ],
    subtotal: 70,
    tax: 10.5,
    total: 80.5,
    status: "confirmed",
    orderType: "takeaway",
    paymentStatus: "paid",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">لوحة تحكم المطعم</h1>
            <p className="text-muted-foreground">مرحباً بك في لوحة تحكم مطعم الأصالة</p>
          </div>

          <div className="space-y-8">
            <DashboardStats stats={mockStats} />
            <RecentOrders orders={mockOrders} />
          </div>
        </div>
      </main>
    </div>
  )
}
