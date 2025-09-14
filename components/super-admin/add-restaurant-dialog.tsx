"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface AddRestaurantDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: RestaurantFormData) => void
}

export interface RestaurantFormData {
  name: string
  slug: string
  description: string
  cuisine: string[]
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    country: string
    zipCode: string
  }
  settings: {
    isActive: boolean
    acceptOrders: boolean
    deliveryEnabled: boolean
    pickupEnabled: boolean
  }
  theme: {
    primaryColor: string
    secondaryColor: string
  }
}

const cuisineOptions = [
  "عربي",
  "شامي",
  "مصري",
  "مغربي",
  "خليجي",
  "لبناني",
  "تركي",
  "إيطالي",
  "آسيوي",
  "هندي",
  "مكسيكي",
  "أمريكي",
]

export function AddRestaurantDialog({ open, onOpenChange, onSubmit }: AddRestaurantDialogProps) {
  const [formData, setFormData] = useState<RestaurantFormData>({
    name: "",
    slug: "",
    description: "",
    cuisine: [],
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "السعودية",
      zipCode: "",
    },
    settings: {
      isActive: true,
      acceptOrders: true,
      deliveryEnabled: false,
      pickupEnabled: true,
    },
    theme: {
      primaryColor: "#0891b2",
      secondaryColor: "#84cc16",
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      name: "",
      slug: "",
      description: "",
      cuisine: [],
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: "السعودية",
        zipCode: "",
      },
      settings: {
        isActive: true,
        acceptOrders: true,
        deliveryEnabled: false,
        pickupEnabled: true,
      },
      theme: {
        primaryColor: "#0891b2",
        secondaryColor: "#84cc16",
      },
    })
  }

  const addCuisine = (cuisine: string) => {
    if (!formData.cuisine.includes(cuisine)) {
      setFormData((prev) => ({
        ...prev,
        cuisine: [...prev.cuisine, cuisine],
      }))
    }
  }

  const removeCuisine = (cuisine: string) => {
    setFormData((prev) => ({
      ...prev,
      cuisine: prev.cuisine.filter((c) => c !== cuisine),
    }))
  }

  const generateSlug = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")

    setFormData((prev) => ({ ...prev, slug }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إضافة مطعم جديد</DialogTitle>
          <DialogDescription>أدخل معلومات المطعم الجديد لإضافته إلى النظام</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">المعلومات الأساسية</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">اسم المطعم</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                    generateSlug(e.target.value)
                  }}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">الرابط المختصر</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="restaurant-name"
                  required
                />
                <p className="text-xs text-muted-foreground">{formData.slug}.restaurantos.com</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">وصف المطعم</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>نوع المطبخ</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.cuisine.map((c) => (
                  <Badge key={c} variant="secondary" className="gap-1">
                    {c}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeCuisine(c)} />
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {cuisineOptions.map((cuisine) => (
                  <Button
                    key={cuisine}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addCuisine(cuisine)}
                    disabled={formData.cuisine.includes(cuisine)}
                  >
                    {cuisine}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">معلومات الاتصال</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="street">العنوان</Label>
                <Input
                  id="street"
                  value={formData.address.street}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: { ...prev.address, street: e.target.value },
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">المدينة</Label>
                <Input
                  id="city"
                  value={formData.address.city}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: { ...prev.address, city: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">الإعدادات</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive">مطعم نشط</Label>
                <Switch
                  id="isActive"
                  checked={formData.settings.isActive}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      settings: { ...prev.settings, isActive: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="acceptOrders">قبول الطلبات</Label>
                <Switch
                  id="acceptOrders"
                  checked={formData.settings.acceptOrders}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      settings: { ...prev.settings, acceptOrders: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="deliveryEnabled">خدمة التوصيل</Label>
                <Switch
                  id="deliveryEnabled"
                  checked={formData.settings.deliveryEnabled}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      settings: { ...prev.settings, deliveryEnabled: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="pickupEnabled">الاستلام من المطعم</Label>
                <Switch
                  id="pickupEnabled"
                  checked={formData.settings.pickupEnabled}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      settings: { ...prev.settings, pickupEnabled: checked },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              إضافة المطعم
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
