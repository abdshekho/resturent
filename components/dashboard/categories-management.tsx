"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
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
import { Plus, MoreHorizontal, Edit, Trash2, Package } from "lucide-react"
import type { Category } from "@/lib/models/Company"
// import { ObjectId } from "mongodb"

interface CategoriesManagementProps {
  categories: Category[]
  onAddCategory: (category: Omit<Category, "_id" | "createdAt" | "updatedAt">) => void
  onEditCategory: (id: string, category: Partial<Category>) => void
  onDeleteCategory: (id: string) => void
}

export function CategoriesManagement({
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
}: CategoriesManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
    sortOrder: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingCategory) {
      onEditCategory(editingCategory._id?.toString() || "", {
        ...formData,
        updatedAt: new Date(),
      })
      setEditingCategory(null)
    } else {
      onAddCategory({
        restaurantId: '12', // This should come from context
        name: formData.name,
        description: formData.description,
        isActive: formData.isActive,
        sortOrder: formData.sortOrder,
      })
    }

    setFormData({ name: "", description: "", isActive: true, sortOrder: 0 })
    setIsAddDialogOpen(false)
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description || "",
      isActive: category.isActive,
      sortOrder: category.sortOrder,
    })
    setIsAddDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>إدارة التصنيفات</CardTitle>
            <CardDescription>إضافة وتعديل تصنيفات القائمة</CardDescription>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Plus className="ml-2 h-4 w-4" />
            إضافة تصنيف
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card key={category._id?.toString()} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(category)}>
                          <Edit className="ml-2 h-4 w-4" />
                          تعديل
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDeleteCategory(category._id?.toString() || "")}
                          className="text-destructive"
                        >
                          <Trash2 className="ml-2 h-4 w-4" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Badge variant={category.isActive ? "default" : "secondary"}>
                    {category.isActive ? "نشط" : "غير نشط"}
                  </Badge>
                </CardHeader>
                <CardContent>
                  {category.description && <p className="text-sm text-muted-foreground">{category.description}</p>}
                  <p className="text-xs text-muted-foreground mt-2">ترتيب: {category.sortOrder}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? "تعديل التصنيف" : "إضافة تصنيف جديد"}</DialogTitle>
            <DialogDescription>
              {editingCategory ? "تعديل معلومات التصنيف" : "أدخل معلومات التصنيف الجديد"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم التصنيف</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
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

            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="isActive">تصنيف نشط</Label>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {editingCategory ? "حفظ التغييرات" : "إضافة التصنيف"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
