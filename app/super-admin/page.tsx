"use client"

import { useState, useEffect } from "react"
import { SuperAdminSidebar } from "@/components/super-admin/sidebar"
import { StatsCards } from "@/components/super-admin/stats-cards"
import { RestaurantsTable } from "@/components/super-admin/restaurants-table"
import { AddRestaurantDialog, type RestaurantFormData } from "@/components/super-admin/add-restaurant-dialog"
import type { Restaurant } from "@/lib/models/Company"

export default function SuperAdminDashboard() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [stats, setStats] = useState({
    totalRestaurants: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restaurantsRes, statsRes] = await Promise.all([
          fetch('/api/super-admin/restaurants'),
          fetch('/api/super-admin/stats')
        ])
        
        if (restaurantsRes.ok) {
          const restaurantsData = await restaurantsRes.json()
          setRestaurants(restaurantsData)
        }
        
        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats(statsData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddRestaurant = async (data: RestaurantFormData) => {
    try {
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
          companyId: "507f1f77bcf86cd799439012", // Default company ID
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        setRestaurants((prev) => [...prev, result.restaurant])
      } else {
        console.error('Failed to add restaurant:', result.message)
      }
    } catch (error) {
      console.error('Error adding restaurant:', error)
    }
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
            <StatsCards stats={stats} />

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
