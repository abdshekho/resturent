"use client"

import { MenuHeader } from "@/components/menu/menu-header"
import { MenuItemCard } from "@/components/menu/menu-item-card"
import { CartSidebar } from "@/components/menu/cart-sidebar"
import type { Restaurant, Category, MenuItem } from "@/lib/models/Company"

interface CartItem {
  menuItem: MenuItem
  quantity: number
}

interface MinimalTemplateProps {
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

export function MinimalTemplate({
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
}: MinimalTemplateProps) {
  return (
    <div className="min-h-screen bg-white">
      <MenuHeader 
        restaurant={restaurant} 
        cartItemCount={cartItemCount} 
        cartTotal={cartTotal} 
        onCartClick={onCartClick} 
      />

      {/* Minimal Category Navigation */}
      <nav className="border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto py-4">
            <button
              onClick={() => onCategoryChange(null)}
              className={`whitespace-nowrap pb-2 text-sm font-medium border-b-2 transition-colors ${
                !activeCategory 
                  ? 'border-black text-black' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              الكل
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => onCategoryChange(category._id!)}
                className={`whitespace-nowrap pb-2 text-sm font-medium border-b-2 transition-colors ${
                  activeCategory === category._id 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {category.nameAr}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          {filteredMenuItems?.map((menuItem) => (
            <div key={menuItem._id?.toString()} className="border-b border-gray-100 pb-8 last:border-b-0">
              <MenuItemCard 
                menuItem={menuItem} 
                onAddToCart={onAddToCart} 
              />
            </div>
          ))}
        </div>

        {filteredMenuItems.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-400">لا توجد أطباق في هذا التصنيف</p>
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