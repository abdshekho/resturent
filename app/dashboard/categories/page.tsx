"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { CategoriesManagement } from "@/components/dashboard/categories-management"
import type { Category } from "@/lib/models/Company"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleAddCategory = async (categoryData: Omit<Category, "_id" | "createdAt" | "updatedAt">) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData)
      })
      
      if (response.ok) {
        const newCategory = await response.json()
        setCategories(prev => [...prev, newCategory])
      }
    } catch (error) {
      console.error('Error adding category:', error)
    }
  }

  const handleEditCategory = async (id: string, categoryData: Partial<Category>) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData)
      })
      
      if (response.ok) {
        setCategories(prev =>
          prev.map(category => category._id?.toString() === id ? { ...category, ...categoryData } : category)
        )
      }
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setCategories(prev => prev.filter(category => category._id?.toString() !== id))
      }
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-background">
        <DashboardSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">جاري تحميل البيانات...</p>
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
            <h1 className="text-3xl font-bold text-foreground">إدارة التصنيفات</h1>
            <p className="text-muted-foreground">إضافة وتعديل تصنيفات القائمة</p>
          </div>

          <CategoriesManagement
            categories={categories}
            onAddCategory={handleAddCategory}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        </div>
      </main>
    </div>
  )
}
