"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { MenuItemsManagement } from "@/components/dashboard/menu-items-management"
import type { MenuItem, Category } from "@/lib/models/Company"
import { ObjectId } from "mongodb"

// Mock data
const mockCategories: Category[] = [
  {
    _id: new ObjectId("507f1f77bcf86cd799439011"),
    restaurantId: new ObjectId(),
    name: "المقبلات",
    description: "مجموعة متنوعة من المقبلات الشهية",
    sortOrder: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId("507f1f77bcf86cd799439012"),
    restaurantId: new ObjectId(),
    name: "الأطباق الرئيسية",
    description: "أطباق رئيسية من المطبخ العربي الأصيل",
    sortOrder: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockMenuItems: MenuItem[] = [
  {
    _id: new ObjectId(),
    restaurantId: new ObjectId(),
    categoryId: new ObjectId("507f1f77bcf86cd799439011"),
    name: "حمص بالطحينة",
    description: "حمص طازج مع الطحينة والزيت والبقدونس",
    price: 15,
    ingredients: ["حمص", "طحينة", "زيت زيتون", "بقدونس"],
    isAvailable: true,
    isPopular: true,
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    restaurantId: new ObjectId(),
    categoryId: new ObjectId("507f1f77bcf86cd799439012"),
    name: "كبسة لحم",
    description: "كبسة لحم غنم طازج مع الأرز البسمتي والخضار",
    price: 45,
    ingredients: ["لحم غنم", "أرز بسمتي", "طماطم", "بصل", "هيل", "قرفة"],
    isAvailable: true,
    isPopular: true,
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems)
  const [categories] = useState<Category[]>(mockCategories)

  const handleAddMenuItem = (menuItemData: Omit<MenuItem, "_id" | "createdAt" | "updatedAt">) => {
    const newMenuItem: MenuItem = {
      ...menuItemData,
      _id: new ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setMenuItems((prev) => [...prev, newMenuItem])
  }

  const handleEditMenuItem = (id: string, menuItemData: Partial<MenuItem>) => {
    setMenuItems((prev) =>
      prev.map((menuItem) =>
        menuItem._id?.toString() === id ? { ...menuItem, ...menuItemData, updatedAt: new Date() } : menuItem,
      ),
    )
  }

  const handleDeleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((menuItem) => menuItem._id?.toString() !== id))
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">إدارة القائمة</h1>
            <p className="text-muted-foreground">إضافة وتعديل الأطباق والمشروبات</p>
          </div>

          <MenuItemsManagement
            menuItems={menuItems}
            categories={categories}
            onAddMenuItem={handleAddMenuItem}
            onEditMenuItem={handleEditMenuItem}
            onDeleteMenuItem={handleDeleteMenuItem}
          />
        </div>
      </main>
    </div>
  )
}
