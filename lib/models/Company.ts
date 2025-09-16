import mongoose from 'mongoose'

export interface Company {
  _id?: string
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
    subscriptionPlan: 'basic' | 'premium' | 'enterprise'
  }
  createdAt?: Date
  updatedAt?: Date
}

export interface Restaurant {
  _id?: string
  companyId: string
  name: string
  slug: string
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
    operatingHours: Record<string, {
      open: string
      close: string
      isOpen: boolean
    }>
  }
  theme: {
    primaryColor: string
    secondaryColor: string
    fontFamily: string
  }
  createdAt?: Date
  updatedAt?: Date
}

export interface Category {
  _id?: string
  restaurantId: string
  name: string
  nameAr: string
  description?: string
  descriptionAr?: string
  image?: string
  sortOrder: number
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface MenuItem {
  _id?: string
  restaurantId: string
  categoryId: string
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
    type: 'single' | 'multiple'
    required: boolean
    choices: {
      name: string
      price: number
    }[]
  }[]
  isAvailable: boolean
  isPopular: boolean
  sortOrder: number
  createdAt?: Date
  updatedAt?: Date
}

export interface Order {
  _id?: string
  restaurantId: string
  orderNumber: string
  customerInfo: {
    name: string
    email?: string
    phone: string
    tableNumber?: string
  }
  items: {
    menuItemId: string
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
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  orderType: 'dine-in' | 'takeaway' | 'delivery'
  paymentStatus: 'pending' | 'paid' | 'failed'
  notes?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface User {
  _id?: string
  email: string
  password: string
  name: string
  role: 'super_admin' | 'restaurant_admin' | 'restaurant_staff'
  companyId?: string
  restaurantId?: string
  permissions: string[]
  isActive: boolean
  lastLogin?: Date
  createdAt?: Date
  updatedAt?: Date
}