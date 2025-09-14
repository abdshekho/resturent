"use client"

import { useState } from "react"
import { SuperAdminSidebar } from "@/components/super-admin/sidebar"
import { StatsCards } from "@/components/super-admin/stats-cards"
import { RestaurantsTable } from "@/components/super-admin/restaurants-table"
import { AddRestaurantDialog, type RestaurantFormData } from "@/components/super-admin/add-restaurant-dialog"
import type { Restaurant } from "@/lib/models/Company"

// Mock data - في التطبيق الحقيقي، ستأتي من API
const mockStats = {
  totalRestaurants: 12,
  totalUsers: 45,
  totalOrders: 1250,
  totalRevenue: 125000,
}

const mockRestaurants: Restaurant[] = [
  {
    _id: "507f1f77bcf86cd799439011",
    companyId: "507f1f77bcf86cd799439012",
    name: "مطعم الأصالة",
    slug: "asala-restaurant",
    description: "مطعم متخصص في الأكلات الشعبية السعودية",
    cuisine: ["عربي", "خليجي"],
    contact: {
      email: "info@asala.com",
      phone: "+966501234567",
      address: {
        street: "شارع الملك فهد",
        city: "الرياض",
        state: "الرياض",
        country: "السعودية",
        zipCode: "12345",
      },
    },
    settings: {
      isActive: true,
      acceptOrders: true,
      deliveryEnabled: true,
      pickupEnabled: true,
      operatingHours: {},
    },
    theme: {
      primaryColor: "#0891b2",
      secondaryColor: "#84cc16",
      fontFamily: "Arial",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "507f1f77bcf86cd799439013",
    companyId: "507f1f77bcf86cd799439014",
    name: "مقهى الورد",
    slug: "alward-cafe",
    description: "مقهى عصري يقدم أفضل أنواع القهوة والحلويات",
    cuisine: ["مقهى", "حلويات"],
    contact: {
      email: "info@alward.com",
      phone: "+966507654321",
      address: {
        street: "شارع التحلية",
        city: "جدة",
        state: "مكة المكرمة",
        country: "السعودية",
        zipCode: "23456",
      },
    },
    settings: {
      isActive: true,
      acceptOrders: true,
      deliveryEnabled: false,
      pickupEnabled: true,
      operatingHours: {},
    },
    theme: {
      primaryColor: "#0891b2",
      secondaryColor: "#84cc16",
      fontFamily: "Arial",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function SuperAdminDashboard() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleAddRestaurant = (data: RestaurantFormData) => {
    const newRestaurant: Restaurant = {
      _id: Math.random().toString(36).substr(2, 9),
      companyId: Math.random().toString(36).substr(2, 9),
      name: data.name,
      slug: data.slug,
      description: data.description,
      cuisine: data.cuisine,
      contact: {
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
      settings: {
        ...data.settings,
        operatingHours: {},
      },
      theme: {
        ...data.theme,
        fontFamily: "Arial",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setRestaurants((prev) => [...prev, newRestaurant])
  }

  const handleViewRestaurant = (id: string) => {
    console.log("View restaurant:", id)
  }

  const handleEditRestaurant = (id: string) => {
    console.log("Edit restaurant:", id)
  }

  const handleDeleteRestaurant = (id: string) => {
    setRestaurants((prev) => prev.filter((r) => r._id?.toString() !== id))
  }

  return (
    <div className="flex h-screen bg-background">
      <SuperAdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">لوحة تحكم المدير العام</h1>
            <p className="text-muted-foreground">مراقبة وإدارة جميع المطاعم في النظام</p>
          </div>

          <div className="space-y-8">
            <StatsCards stats={mockStats} />

            <RestaurantsTable
              restaurants={restaurants}
              onAddRestaurant={() => setIsAddDialogOpen(true)}
              onViewRestaurant={handleViewRestaurant}
              onEditRestaurant={handleEditRestaurant}
              onDeleteRestaurant={handleDeleteRestaurant}
            />
          </div>
        </div>
      </main>

      <AddRestaurantDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSubmit={handleAddRestaurant} />
    </div>
  )
}
