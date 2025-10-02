"use client"

import { ModernMenuHeader } from "@/components/menu/templates/modern/Modern-menu-header"
import { ModernCategoryTabs } from "@/components/menu/templates/modern/Modern-category-tabs"
import { ModernMenuItemCard } from "@/components/menu/templates/modern/Modern-menu-item-card"
import { CartSidebar } from "@/components/menu/cart-sidebar"
import type { Restaurant, Category, MenuItem } from "@/lib/models/Company"

interface CartItem {
  menuItem: MenuItem
  quantity: number
}

interface ModernTemplateProps {
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

export function ModernTemplate({
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
}: ModernTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-300 to-slate-50">
      <ModernMenuHeader 
        restaurant={restaurant} 
        cartItemCount={cartItemCount} 
        cartTotal={cartTotal} 
        onCartClick={onCartClick} 
      />
      
      <div className="sticky top-0 z-40 bg-white/50 backdrop-blur-md border-b">
        <ModernCategoryTabs 
          categories={categories} 
          activeCategory={activeCategory} 
          onCategoryChange={onCategoryChange} 
        />
      </div>

      <main className="container mx-auto px-6 py-12">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredMenuItems?.map((menuItem) => (
            <div key={menuItem._id?.toString()} className="">
              <ModernMenuItemCard 
                menuItem={menuItem} 
                onAddToCart={onAddToCart} 
              />
            </div>
          ))}
        </div>

        {filteredMenuItems.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl p-12 shadow-lg">
              <p className="text-slate-600 text-lg">لا توجد أطباق في هذا التصنيف</p>
            </div>
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