"use client"

import { useState, useMemo, useEffect, use } from "react"
import { MenuHeader } from "@/components/menu/menu-header"
import { CategoryTabs } from "@/components/menu/category-tabs"
import { MenuItemCard } from "@/components/menu/menu-item-card"
import { CartSidebar } from "@/components/menu/cart-sidebar"
import { LanguageProvider } from "@/components/language-provider"
import type { Restaurant, Category, MenuItem } from "@/lib/models/Company"

interface CartItem {
  menuItem: MenuItem
  quantity: number
}

export default function MenuPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const loadRestaurantData = async () => {
      try {
        setLoading(true)
        
        const [restaurantRes, categoriesRes, menuRes] = await Promise.all([
          fetch(`/api/restaurants/${resolvedParams.slug}`),
          fetch(`/api/restaurants/${resolvedParams.slug}/categories`),
          fetch(`/api/restaurants/${resolvedParams.slug}/menu`)
        ])

        if (!restaurantRes.ok) {
          setError("المطعم غير موجود")
          return
        }

        const restaurantData = await restaurantRes.json()
        
        // if (!restaurantData.restaurant.settings.isActive) {
        //   setError("المطعم غير نشط حالياً")
        //   return
        // }

        setRestaurant(restaurantData.restaurant)

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json()
          setCategories(categoriesData.categories)
        }

        if (menuRes.ok) {
          const menuData = await menuRes.json()
          console.log('Menu data:', menuData)
          setMenuItems(menuData.menuItems || [])
        }
      } catch (err) {
        console.error("Error loading restaurant data:", err)
        setError("حدث خطأ في تحميل بيانات المطعم")
      } finally {
        setLoading(false)
      }
    }

    loadRestaurantData()
  }, [resolvedParams.slug])

  // Filter menu items by active category
  const filteredMenuItems = useMemo(() => {
    if (!activeCategory) return menuItems
    return menuItems.filter((item) => item.categoryId.toString() === activeCategory)
  }, [activeCategory, menuItems])

  // Calculate cart totals
  const cartTotal = cartItems.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0)
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleAddToCart = (menuItem: MenuItem, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.menuItem._id?.toString() === menuItem._id?.toString())

      if (existingItem) {
        return prev.map((item) =>
          item.menuItem._id?.toString() === menuItem._id?.toString()
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      } else {
        return [...prev, { menuItem, quantity }]
      }
    })
  }

  const handleUpdateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(menuItemId)
      return
    }

    setCartItems((prev) =>
      prev.map((item) => (item.menuItem._id?.toString() === menuItemId ? { ...item, quantity } : item)),
    )
  }

  const handleRemoveItem = (menuItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.menuItem._id?.toString() !== menuItemId))
  }

  const handlePlaceOrder = async (orderData: any) => {
    try {
      const subtotal = cartItems.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0)
      const tax = subtotal * 0.15
      const total = subtotal + tax

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantId: restaurant!._id!,
          customerInfo: orderData.customerInfo,
          items: cartItems.map((item) => ({
            menuItemId: item.menuItem._id!,
            name: item.menuItem.name,
            price: item.menuItem.price,
            quantity: item.quantity,
          })),
          subtotal,
          tax,
          total,
          orderType: orderData.orderType,
          notes: orderData.notes,
        })
      })

      if (response.ok) {
        const result = await response.json()
        alert(`تم تأكيد طلبك! رقم الطلب: ${result.order.orderNumber}`)
        setCartItems([])
        setIsCartOpen(false)
      } else {
        throw new Error('Failed to place order')
      }
    } catch (error) {
      console.error("Error placing order:", error)
      alert("حدث خطأ في تأكيد الطلب. يرجى المحاولة مرة أخرى.")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري تحميل القائمة...</p>
        </div>
      </div>
    )
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">عذراً</h1>
          <p className="text-muted-foreground mb-4">{error || "المطعم غير موجود"}</p>
          <a href="/" className="text-primary hover:underline">
            العودة إلى الصفحة الرئيسية
          </a>
        </div>
      </div>
    )
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <MenuHeader 
          restaurant={restaurant} 
          cartItemCount={cartItemCount} 
          cartTotal={cartTotal} 
          onCartClick={() => setIsCartOpen(true)} 
        />
        <CategoryTabs categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-1 lg:gap-6 grid-cols-2 lg:grid-cols-3">
          {filteredMenuItems && filteredMenuItems?.length &&filteredMenuItems.map((menuItem) => (
            <MenuItemCard key={menuItem._id?.toString()} menuItem={menuItem} onAddToCart={handleAddToCart} />
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
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handlePlaceOrder}
      />
      </div>
    </LanguageProvider>
  )
}
