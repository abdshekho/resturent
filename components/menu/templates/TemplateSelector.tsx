import { ClassicTemplate } from './ClassicTemplate'
import { ModernTemplate } from './modern/ModernTemplate'
import { MinimalTemplate } from './MinimalTemplate'
import { ElegantTemplate } from './ElegantTemplate'
import type { Restaurant, Category, MenuItem } from "@/lib/models/Company"

interface CartItem {
  menuItem: MenuItem
  quantity: number
}

interface TemplateSelectorProps {
  template: 'classic' | 'modern' | 'minimal' | 'elegant'
  restaurant: Restaurant
  categories: Category[]
  filteredMenuItems: MenuItem[]
  activeCategory: string | null
  onCategoryChange: (category: string | null) => void
  cartItems: CartItem[]
  cartItemCount: number
  cartTotal: number
  isCartOpen: boolean
  onCartClick: () => void
  onCartClose: () => void
  onAddToCart: (menuItem: MenuItem, quantity: number) => void
  onUpdateQuantity: (menuItemId: string, quantity: number) => void
  onRemoveItem: (menuItemId: string) => void
  onPlaceOrder: (orderData: any) => void
}

export function TemplateSelector({ template, ...props }: TemplateSelectorProps) {
  switch (template) {
    case 'modern':
      return <ModernTemplate {...props} />
    case 'minimal':
      return <MinimalTemplate {...props} />
    case 'elegant':
      return <ElegantTemplate {...props} />
    case 'classic':
    default:
      return <ClassicTemplate {...props} />
  }
}