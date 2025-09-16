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
    <Button
      onClick={onClick}
      size="sm"
      className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg rounded-full px-4 py-2 flex items-center gap-2"
    >
      <div className="relative">
        <ShoppingCart className="h-4 w-4" />
        <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
          {itemCount}
        </Badge>
      </div>
      <span className="font-semibold text-sm">{total.toFixed(2)} SP</span>
    </Button>
  )
}
