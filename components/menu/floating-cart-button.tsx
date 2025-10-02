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
      // size="lg"
      className="px-4 py-2 flex items-center gap-2 bg-transparent border relative text-black dark:text-white group"
    >
      <span className="font-semibold text-sm hidden group-hover:block" dir="ltr">{total} SP</span>
        <ShoppingCart className="h-4 w-4" />
        <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs">
          {itemCount}
        </Badge>
    </Button>
  )
}
