"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, Star, ImageIcon } from "lucide-react"
import type { MenuItem } from "@/lib/models/Company"

interface MenuItemCardProps {
  menuItem: MenuItem
  onAddToCart: (menuItem: MenuItem, quantity: number) => void
}

export function MenuItemCard({ menuItem, onAddToCart }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(0)

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart(menuItem, quantity)
      setQuantity(0)
    }
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(0, prev - 1))

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative h-48 bg-muted flex items-center justify-center">
          {menuItem.image ? (
            <img
              src={menuItem.image || "/placeholder.svg"}
              alt={menuItem.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
          )}
          {menuItem.isPopular && (
            <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
              <Star className="h-3 w-3 mr-1 fill-current" />
              مميز
            </Badge>
          )}
          {!menuItem.isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive">غير متوفر</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg text-foreground">{menuItem.name}</h3>
            <span className="text-lg font-bold text-primary">{menuItem.price} ريال</span>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{menuItem.description}</p>

          {menuItem.ingredients && menuItem.ingredients.length > 0 && (
            <p className="text-xs text-muted-foreground mb-3">المكونات: {menuItem.ingredients.join(", ")}</p>
          )}

          {/* Add to Cart */}
          {menuItem.isAvailable && (
            <div className="flex items-center justify-between">
              {quantity === 0 ? (
                <Button
                  onClick={incrementQuantity}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة إلى السلة
                </Button>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={decrementQuantity}
                      className="h-8 w-8 p-0 bg-transparent"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold text-lg">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={incrementQuantity}
                      className="h-8 w-8 p-0 bg-transparent"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={handleAddToCart} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    إضافة ({(menuItem.price * quantity).toFixed(2)} ريال)
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
