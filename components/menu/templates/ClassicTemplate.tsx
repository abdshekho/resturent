"use client"

import { MenuHeader } from "@/components/menu/menu-header"
import { CategoryTabs } from "@/components/menu/category-tabs"
import { MenuItemCard } from "@/components/menu/menu-item-card"
import { CartSidebar } from "@/components/menu/cart-sidebar"
import type { Restaurant, Category, MenuItem } from "@/lib/models/Company"

interface CartItem {
  menuItem: MenuItem
  quantity: number
}

interface ClassicTemplateProps {
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

export function ClassicTemplate({
  restaurant,
  categories,
  filteredMenuItems,
  activeCategory,
  onCategoryChange,
  cartItems,
  cartItemCount,
  cartTotal,
  isCartOpen,
  onCartClick,
  onCartClose,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}: ClassicTemplateProps) {
  return (
    <div className="min-h-screen bg-background">
      <MenuHeader 
        restaurant={restaurant} 
        cartItemCount={cartItemCount} 
        cartTotal={cartTotal} 
        onCartClick={onCartClick} 
      />
      <CategoryTabs 
        categories={categories} 
        activeCategory={activeCategory} 
        onCategoryChange={onCategoryChange} 
      />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-1 lg:gap-6 grid-cols-2 lg:grid-cols-3">
          {filteredMenuItems?.map((menuItem) => (
            <MenuItemCard 
              key={menuItem._id?.toString()} 
              menuItem={menuItem} 
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>

        {filteredMenuItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">لا توجد أطباق في هذا التصنيف</p>
          </div>
        )}
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={onCartClose}
        cartItems={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
        onPlaceOrder={onPlaceOrder}
      />
    </div>
  )
}