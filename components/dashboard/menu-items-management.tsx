"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, MoreHorizontal, Edit, Trash2, Star, ImageIcon } from "lucide-react"
import type { MenuItem, Category } from "@/lib/models/Company"

interface MenuItemsManagementProps {
  menuItems: MenuItem[]
  categories: Category[]
  onAddMenuItem: (menuItem: Omit<MenuItem, "_id" | "createdAt" | "updatedAt">) => void
  onEditMenuItem: (id: string, menuItem: Partial<MenuItem>) => void
  onDeleteMenuItem: (id: string) => void
}

export function MenuItemsManagement({
  menuItems,
  categories,
  onAddMenuItem,
  onEditMenuItem,
  onDeleteMenuItem,
}: MenuItemsManagementProps) {
  const { user } = useAuth()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: "",
    isAvailable: true,
    isPopular: false,
    sortOrder: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingMenuItem) {
      onEditMenuItem(editingMenuItem._id?.toString() || "", {
        ...formData,
        categoryId: formData.categoryId,
        updatedAt: new Date(),
      })
      setEditingMenuItem(null)
    } else {
      onAddMenuItem({
        restaurantId: user?.restaurantId || "",
        categoryId: formData.categoryId,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        isAvailable: formData.isAvailable,
        isPopular: formData.isPopular,
        sortOrder: formData.sortOrder,
      })
    }

    setFormData({
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      isAvailable: true,
      isPopular: false,
      sortOrder: 0,
    })
    setIsAddDialogOpen(false)
  }

  const handleEdit = (menuItem: MenuItem) => {
    setEditingMenuItem(menuItem)
    setFormData({
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      categoryId: menuItem.categoryId.toString(),
      isAvailable: menuItem.isAvailable,
      isPopular: menuItem.isPopular,
      sortOrder: menuItem.sortOrder,
    })
    setIsAddDialogOpen(true)
  }

  const getCategoryName = (categoryId: string | any) => {
    const category = categories.find((c) => c._id?.toString() === categoryId.toString())
    return category?.name || "غير محدد"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>إدارة عناصر القائمة</CardTitle>
            <CardDescription>إضافة وتعديل الأطباق والمشروبات</CardDescription>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Plus className="ml-2 h-4 w-4" />
            إضافة طبق جديد
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((menuItem) => (
              <Card key={menuItem._id?.toString()} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{menuItem.name}</CardTitle>
                      {menuItem.isPopular && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(menuItem)}>
                          <Edit className="ml-2 h-4 w-4" />
                          تعديل
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDeleteMenuItem(menuItem._id?.toString() || "")}
                          className="text-destructive"
                        >
                          <Trash2 className="ml-2 h-4 w-4" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={menuItem.isAvailable ? "default" : "secondary"}>
                      {menuItem.isAvailable ? "متوفر" : "غير متوفر"}
                    </Badge>
                    <Badge variant="outline">{getCategoryName(menuItem.categoryId)}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{menuItem.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{menuItem.price} ريال</span>
                    <span className="text-xs text-muted-foreground">ترتيب: {menuItem.sortOrder}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingMenuItem ? "تعديل الطبق" : "إضافة طبق جديد"}</DialogTitle>
            <DialogDescription>
              {editingMenuItem ? "تعديل معلومات الطبق" : "أدخل معلومات الطبق الجديد"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">اسم الطبق</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">السعر (ريال)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) || 0 }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId">التصنيف</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, categoryId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id?.toString()} value={category._id?.toString() || ""}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sortOrder">ترتيب العرض</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, sortOrder: Number.parseInt(e.target.value) || 0 }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="isAvailable">متوفر</Label>
                <Switch
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isAvailable: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="isPopular">طبق مميز</Label>
                <Switch
                  id="isPopular"
                  checked={formData.isPopular}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPopular: checked }))}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {editingMenuItem ? "حفظ التغييرات" : "إضافة الطبق"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
