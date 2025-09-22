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

interface ElegantTemplateProps {
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

export function ElegantTemplate({
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
}: ElegantTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <MenuHeader 
        restaurant={restaurant} 
        cartItemCount={cartItemCount} 
        cartTotal={cartTotal} 
        onCartClick={onCartClick} 
      />
      
      <div className="bg-white/90 backdrop-blur-sm shadow-sm">
        <CategoryTabs 
          categories={categories} 
          activeCategory={activeCategory} 
          onCategoryChange={onCategoryChange} 
        />
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Elegant Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-amber-900 mb-4">{restaurant.name}</h1>
          <div className="w-24 h-0.5 bg-amber-600 mx-auto"></div>
        </div>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          {filteredMenuItems?.map((menuItem) => (
            <div key={menuItem._id?.toString()} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-amber-100">
              <MenuItemCard 
                menuItem={menuItem} 
                onAddToCart={onAddToCart} 
              />
            </div>
          ))}
        </div>

        {filteredMenuItems.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-md p-12 border border-amber-100">
              <p className="text-amber-800 text-lg font-serif">لا توجد أطباق في هذا التصنيف</p>
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