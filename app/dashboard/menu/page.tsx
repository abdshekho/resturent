"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { MenuItemsManagement } from "@/components/dashboard/menu-items-management"
import type { IMenuItem, ICategory } from "@/lib/models/mongoose"

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {}

        const [menuRes, categoriesRes] = await Promise.all([
          fetch('/api/menu', { headers }),
          fetch('/api/categories', { headers })
        ])

        if (menuRes.ok) {
          const menuData = await menuRes.json()
          setMenuItems(menuData)
        }

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json()
          setCategories(categoriesData)
        }
      } catch (error) {
        console.error('Error fetching menu data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddMenuItem = async (menuItemData: Omit<IMenuItem, "_id" | "createdAt" | "updatedAt">) => {

    console.log('🚀 ~ page.tsx ~ handleAddMenuItem ~ menuItemData:', menuItemData);

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(menuItemData)
      })

      if (response.ok) {
        const newMenuItem = await response.json()
        setMenuItems(prev => [...prev, newMenuItem])
      }
    } catch (error) {
      console.error('Error adding menu item:', error)
    }
  }

  const handleEditMenuItem = async (id: string, menuItemData: Partial<IMenuItem>) => {

    console.log('🚀 ~ page.tsx ~ handleEditMenuItem ~ menuItemData:', menuItemData);

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/menu/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(menuItemData)
      })

      if (response.ok) {
        setMenuItems(prev => prev.map(item => item._id?.toString() === id ? { ...item, ...menuItemData } : item))
      }
    } catch (error) {
      console.error('Error updating menu item:', error)
    }
  }

  const handleDeleteMenuItem = async (id: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      })

      if (response.ok) {
        setMenuItems(prev => prev.filter(item => item._id?.toString() !== id))
      }
    } catch (error) {
      console.error('Error deleting menu item:', error)
    }
  }

  if (loading) {
    return (
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">جاري تحميل البيانات...</p>
          </div>
        </main>
    )
  }

  return (
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">إدارة القائمة</h1>
            <p className="text-muted-foreground">إضافة وتعديل الأطباق والمشروبات</p>
          </div>

          <MenuItemsManagement
            menuItems={ menuItems }
            categories={ categories }
            onAddMenuItem={ handleAddMenuItem }
            onEditMenuItem={ handleEditMenuItem }
            onDeleteMenuItem={ handleDeleteMenuItem }
          />
        </div>
      </main>
  )
}
