import type { ObjectId } from "mongodb"

export interface Company {
  _id?: ObjectId
  name: string
  description: string
  logo?: string
  website?: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    country: string
    zipCode: string
  }
  settings: {
    allowRegistration: boolean
    maxRestaurants: number
    subscriptionPlan: "basic" | "premium" | "enterprise"
  }
  createdAt: Date
  updatedAt: Date
}

export interface Restaurant {
  _id?: ObjectId
  companyId: ObjectId
  name: string
  slug: string // for subdomain
  description: string
  logo?: string
  coverImage?: string
  cuisine: string[]
  contact: {
    email: string
    phone: string
    address: {
      street: string
      city: string
      state: string
      country: string
      zipCode: string
    }
  }
  settings: {
    isActive: boolean
    acceptOrders: boolean
    deliveryEnabled: boolean
    pickupEnabled: boolean
    operatingHours: {
      [key: string]: {
        open: string
        close: string
        isOpen: boolean
      }
    }
  }
  theme: {
    primaryColor: string
    secondaryColor: string
    fontFamily: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  _id?: ObjectId
  restaurantId: ObjectId
  name: string
  description?: string
  image?: string
  sortOrder: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface MenuItem {
  _id?: ObjectId
  restaurantId: ObjectId
  categoryId: ObjectId
  name: string
  description: string
  price: number
  image?: string
  ingredients?: string[]
  allergens?: string[]
  nutritionalInfo?: {
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
  }
  options?: {
    name: string
    type: "single" | "multiple"
    required: boolean
    choices: {
      name: string
      price: number
    }[]
  }[]
  isAvailable: boolean
  isPopular: boolean
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  _id?: ObjectId
  restaurantId: ObjectId
  orderNumber: string
  customerInfo: {
    name: string
    email?: string
    phone: string
    tableNumber?: string
  }
  items: {
    menuItemId: ObjectId
    name: string
    price: number
    quantity: number
    selectedOptions?: {
      name: string
      choice: string
      price: number
    }[]
    specialInstructions?: string
  }[]
  subtotal: number
  tax: number
  total: number
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
  orderType: "dine-in" | "takeaway" | "delivery"
  paymentStatus: "pending" | "paid" | "failed"
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface User {
  _id?: ObjectId
  email: string
  password: string
  name: string
  role: "super_admin" | "restaurant_admin" | "restaurant_staff"
  companyId?: ObjectId
  restaurantId?: ObjectId
  permissions: string[]
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}
