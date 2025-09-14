import { QrCode, MapPin, Phone, Clock } from "lucide-react"
import type { Restaurant } from "@/lib/models/Company"

interface MenuHeaderProps {
  restaurant: Restaurant
}

export function MenuHeader({ restaurant }: MenuHeaderProps) {
  console.log(restaurant)
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
    </header>
  )
}
