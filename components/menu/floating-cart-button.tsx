"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

interface FloatingCartButtonProps {
  itemCount: number
  total: number
  onClick: () => void
}

export function FloatingCartButton({ itemCount, total, onClick }: FloatingCartButtonProps) {
  if (itemCount === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <Button
        onClick={onClick}
        size="lg"
        className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg rounded-full px-6 py-3 flex items-center gap-3"
      >
        <div className="relative">
          <ShoppingCart className="h-5 w-5" />
          <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
            {itemCount}
          </Badge>
        </div>
        <span className="font-semibold">عرض السلة • {total.toFixed(2)} ريال</span>
      </Button>
    </div>
  )
}
