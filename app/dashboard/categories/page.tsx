"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { CategoriesManagement } from "@/components/dashboard/categories-management"
import type { Category } from "@/lib/models/Company"
import { ObjectId } from "mongodb"

// Mock data
const mockCategories: Category[] = [
  {
    _id: new ObjectId(),
    restaurantId: new ObjectId(),
    name: "المقبلات",
    description: "مجموعة متنوعة من المقبلات الشهية",
    sortOrder: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    restaurantId: new ObjectId(),
    name: "الأطباق الرئيسية",
    description: "أطباق رئيسية من المطبخ العربي الأصيل",
    sortOrder: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    restaurantId: new ObjectId(),
    name: "المشروبات",
    description: "مشروبات ساخنة وباردة",
    sortOrder: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)

  const handleAddCategory = (categoryData: Omit<Category, "_id" | "createdAt" | "updatedAt">) => {
    const newCategory: Category = {
      ...categoryData,
      _id: new ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setCategories((prev) => [...prev, newCategory])
  }

  const handleEditCategory = (id: string, categoryData: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((category) =>
        category._id?.toString() === id ? { ...category, ...categoryData, updatedAt: new Date() } : category,
      ),
    )
  }

  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((category) => category._id?.toString() !== id))
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
