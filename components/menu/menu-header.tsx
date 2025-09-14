import { QrCode, MapPin, Phone, Clock } from "lucide-react"
import type { Restaurant } from "@/lib/models/Company"

interface MenuHeaderProps {
  restaurant: Restaurant
}

export function MenuHeader({ restaurant }: MenuHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Restaurant Info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              {restaurant.logo ? (
                <img src={restaurant.logo || "/placeholder.svg"} alt={restaurant.name} className="w-8 h-8 rounded" />
              ) : (
                <QrCode className="h-6 w-6 text-primary" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{restaurant.name}</h1>
              <p className="text-sm text-muted-foreground">{restaurant.description}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{restaurant.contact.address.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{restaurant.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>مفتوح الآن</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
