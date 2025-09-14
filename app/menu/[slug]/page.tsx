"use client"

import { useState, useMemo, useEffect } from "react"
import { MenuHeader } from "@/components/menu/menu-header"
import { CategoryTabs } from "@/components/menu/category-tabs"
import { MenuItemCard } from "@/components/menu/menu-item-card"
import { CartSidebar } from "@/components/menu/cart-sidebar"
import { FloatingCartButton } from "@/components/menu/floating-cart-button"
import { DatabaseService } from "@/lib/database"
import type { Restaurant, Category, MenuItem } from "@/lib/models/Company"
import { ObjectId } from "mongodb"

// Mock data - في التطبيق الحقيقي، ستأتي من API
const mockRestaurant: Restaurant = {
  _id: new ObjectId(),
  companyId: new ObjectId(),
  name: "مطعم الأصالة",
  slug: "asala-restaurant",
  description: "مطعم متخصص في الأكلات الشعبية السعودية الأصيلة",
  cuisine: ["عربي", "خليجي"],
  contact: {
    email: "info@asala.com",
    phone: "+966 50 123 4567",
    address: {
      street: "شارع الملك فهد",
      city: "الرياض",
      state: "الرياض",
      country: "السعودية",
      zipCode: "12345",
    },
  },
  settings: {
    isActive: true,
    acceptOrders: true,
    deliveryEnabled: true,
    pickupEnabled: true,
    operatingHours: {},
  },
  theme: {
    primaryColor: "#0891b2",
    secondaryColor: "#84cc16",
    fontFamily: "Arial",
  },
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockCategories: Category[] = [
  {
    _id: new ObjectId("507f1f77bcf86cd799439011"),
    restaurantId: new ObjectId(),
    name: "المقبلات",
    description: "مجموعة متنوعة من المقبلات الشهية",
    sortOrder: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId("507f1f77bcf86cd799439012"),
    restaurantId: new ObjectId(),
    name: "الأطباق الرئيسية",
    description: "أطباق رئيسية من المطبخ العربي الأصيل",
    sortOrder: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId("507f1f77bcf86cd799439013"),
    restaurantId: new ObjectId(),
    name: "المشروبات",
    description: "مشروبات ساخنة وباردة",
    sortOrder: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockMenuItems: MenuItem[] = [
  {
    _id: new ObjectId(),
    restaurantId: new ObjectId(),
    categoryId: new ObjectId("507f1f77bcf86cd799439011"),
    name: "حمص بالطحينة",
    description: "حمص طازج مع الطحينة والزيت والبقدونس",
    price: 15,
    ingredients: ["حمص", "طحينة", "زيت زيتون", "بقدونس"],
    isAvailable: true,
    isPopular: true,
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    restaurantId: new ObjectId(),
    categoryId: new ObjectId("507f1f77bcf86cd799439011"),
    name: "متبل باذنجان",
    description: "متبل باذنجان مشوي مع الطحينة والثوم",
    price: 12,
    ingredients: ["باذنجان", "طحينة", "ثوم", "ليمون"],
    isAvailable: true,
    isPopular: false,
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    restaurantId: new ObjectId(),
    categoryId: new ObjectId("507f1f77bcf86cd799439012"),
    name: "كبسة لحم",
    description: "كبسة لحم غنم طازج مع الأرز البسمتي والخضار",
    price: 45,
    ingredients: ["لحم غنم", "أرز بسمتي", "طماطم", "بصل", "هيل", "قرفة"],
    isAvailable: true,
    isPopular: true,
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    restaurantId: new ObjectId(),
    categoryId: new ObjectId("507f1f77bcf86cd799439012"),
    name: "مندي دجاج",
    description: "مندي دجاج طازج مع الأرز البسمتي والسلطة",
    price: 35,
    ingredients: ["دجاج", "أرز بسمتي", "بصل", "هيل", "قرفة"],
    isAvailable: true,
    isPopular: false,
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    restaurantId: new ObjectId(),
    categoryId: new ObjectId("507f1f77bcf86cd799439013"),
    name: "شاي أحمر",
    description: "شاي أحمر طازج مع السكر",
    price: 5,
    ingredients: ["شاي", "سكر"],
    isAvailable: true,
    isPopular: false,
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    restaurantId: new ObjectId(),
    categoryId: new ObjectId("507f1f77bcf86cd799439013"),
    name: "قهوة عربية",
    description: "قهوة عربية أصيلة مع الهيل",
    price: 8,
    ingredients: ["قهوة", "هيل"],
    isAvailable: true,
    isPopular: true,
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

interface CartItem {
  menuItem: MenuItem
  quantity: number
}

export default function MenuPage({ params }: { params: { slug: string } }) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(mockRestaurant)
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const loadRestaurantData = async () => {
      try {
        setLoading(true)
        const db = DatabaseService.getInstance()

        // Get restaurant by slug
        const restaurantData = await db.getRestaurantBySlug(params.slug)

        if (!restaurantData) {
          setError("المطعم غير موجود")
          return
        }

        if (!restaurantData.settings.isActive) {
          setError("المطعم غير نشط حالياً")
          return
        }

        setRestaurant(restaurantData)

        // Get categories and menu items
        const [categoriesData, menuItemsData] = await Promise.all([
          db.getCategoriesByRestaurant(restaurantData._id!),
          db.getMenuItemsByRestaurant(restaurantData._id!),
        ])

        setCategories(categoriesData)
        setMenuItems(menuItemsData)
      } catch (err) {
        console.error("Error loading restaurant data:", err)
        setError("حدث خطأ في تحميل بيانات المطعم")
      } finally {
        setLoading(false)
      }
    }

    loadRestaurantData()
  }, [params.slug])

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
      const db = DatabaseService.getInstance()

      // Generate order number
      const orderNumber = `ORD-${Date.now()}`

      // Calculate totals
      const subtotal = cartItems.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0)
      const tax = subtotal * 0.15
      const total = subtotal + tax

      // Create order
      const order = await db.createOrder({
        restaurantId: restaurant!._id!,
        orderNumber,
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
        status: "pending",
        orderType: orderData.orderType,
        paymentStatus: "pending",
        notes: orderData.notes,
      })

      alert(`تم تأكيد طلبك! رقم الطلب: ${orderNumber}`)
      setCartItems([])
      setIsCartOpen(false)
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
    <div className="min-h-screen bg-background">
      <MenuHeader restaurant={restaurant} />
      <CategoryTabs categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMenuItems.map((menuItem) => (
            <MenuItemCard key={menuItem._id?.toString()} menuItem={menuItem} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {filteredMenuItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">لا توجد أطباق في هذا التصنيف</p>
          </div>
        )}
      </main>

      <FloatingCartButton itemCount={cartItemCount} total={cartTotal} onClick={() => setIsCartOpen(true)} />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  )
}
