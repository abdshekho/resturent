import { QrCode, MapPin, Phone, Clock } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { FloatingCartButton } from "@/components/menu/floating-cart-button"
import type { Restaurant } from "@/lib/models/Company"

interface MenuHeaderProps {
  restaurant: Restaurant
  cartItemCount?: number
  cartTotal?: number
  onCartClick?: () => void
}

export function MenuHeader({ restaurant, cartItemCount = 0, cartTotal = 0, onCartClick }: MenuHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{restaurant.name}</h1>
        <div className="flex items-center gap-2">
          {cartItemCount > 0 && onCartClick && (
            <FloatingCartButton 
              itemCount={cartItemCount} 
              total={cartTotal} 
              onClick={onCartClick} 
            />
          )}
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
