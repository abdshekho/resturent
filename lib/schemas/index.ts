import { z } from 'zod'

// Company Schema
export const CompanySchema = z.object({
  name: z.string().min(1, 'اسم الشركة مطلوب'),
  description: z.string().min(1, 'وصف الشركة مطلوب'),
  logo: z.string().optional(),
  website: z.string().url('رابط الموقع غير صحيح').optional(),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  phone: z.string().min(1, 'رقم الهاتف مطلوب'),
  address: z.object({
    street: z.string().min(1, 'الشارع مطلوب'),
    city: z.string().min(1, 'المدينة مطلوبة'),
    state: z.string().min(1, 'المحافظة مطلوبة'),
    country: z.string().min(1, 'البلد مطلوب'),
    zipCode: z.string().min(1, 'الرمز البريدي مطلوب'),
  }),
  settings: z.object({
    allowRegistration: z.boolean().default(true),
    maxRestaurants: z.number().min(1).default(5),
    subscriptionPlan: z.enum(['basic', 'premium', 'enterprise']).default('basic'),
  }),
})

// Restaurant Schema
export const RestaurantSchema = z.object({
  companyId: z.string().min(1, 'معرف الشركة مطلوب'),
  name: z.string().min(1, 'اسم المطعم مطلوب'),
  slug: z.string().min(1, 'الرابط المختصر مطلوب'),
  description: z.string().min(1, 'وصف المطعم مطلوب'),
  logo: z.string().optional(),
  coverImage: z.string().optional(),
  cuisine: z.array(z.string()).default([]),
  contact: z.object({
    email: z.string().email('البريد الإلكتروني غير صحيح'),
    phone: z.string().min(1, 'رقم الهاتف مطلوب'),
    address: z.object({
      street: z.string().min(1, 'الشارع مطلوب'),
      city: z.string().min(1, 'المدينة مطلوبة'),
      state: z.string().min(1, 'المحافظة مطلوبة'),
      country: z.string().min(1, 'البلد مطلوب'),
      zipCode: z.string().min(1, 'الرمز البريدي مطلوب'),
    }),
  }),
  settings: z.object({
    isActive: z.boolean().default(true),
    acceptOrders: z.boolean().default(true),
    deliveryEnabled: z.boolean().default(false),
    pickupEnabled: z.boolean().default(true),
    operatingHours: z.record(z.object({
      open: z.string(),
      close: z.string(),
      isOpen: z.boolean(),
    })).default({}),
  }),
  theme: z.object({
    primaryColor: z.string().default('#000000'),
    secondaryColor: z.string().default('#ffffff'),
    fontFamily: z.string().default('Arial'),
  }),
})

// Category Schema
export const CategorySchema = z.object({
  restaurantId: z.string().min(1, 'معرف المطعم مطلوب'),
  name: z.string().min(1, 'اسم الفئة مطلوب'),
  nameAr: z.string().min(1, 'الاسم العربي للفئة مطلوب'),
  description: z.string().optional(),
  descriptionAr: z.string().optional(),
  image: z.string().optional(),
  sortOrder: z.number().default(0),
  isActive: z.boolean().default(true),
})

// MenuItem Schema
export const MenuItemSchema = z.object({
  restaurantId: z.string().min(1, 'معرف المطعم مطلوب'),
  categoryId: z.string().min(1, 'معرف الفئة مطلوب'),
  name: z.string().min(1, 'اسم الطبق مطلوب'),
  nameAr: z.string().min(1, 'الاسم العربي للطبق مطلوب'),
  description: z.string().min(1, 'وصف الطبق مطلوب'),
  descriptionAr: z.string().min(1, 'الوصف العربي للبطق مطلوب'),
  price: z.number().min(0, 'السعر يجب أن يكون أكبر من أو يساوي صفر'),
  image: z.string().optional(),
  isAvailable: z.boolean().default(true),
  isPopular: z.boolean().default(false),
  sortOrder: z.number().default(0),
})

// Order Schema
export const OrderSchema = z.object({
  restaurantId: z.string().min(1, 'معرف المطعم مطلوب'),
  orderNumber: z.string().min(1, 'رقم الطلب مطلوب'),
  customerInfo: z.object({
    name: z.string().min(1, 'اسم العميل مطلوب'),
    email: z.string().email('البريد الإلكتروني غير صحيح').optional(),
    phone: z.string().min(1, 'رقم الهاتف مطلوب'),
    tableNumber: z.string().optional(),
  }),
  items: z.array(z.object({
    menuItemId: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number().min(1),
    selectedOptions: z.array(z.object({
      name: z.string(),
      choice: z.string(),
      price: z.number(),
    })).optional(),
    specialInstructions: z.string().optional(),
  })),
  subtotal: z.number().min(0),
  tax: z.number().min(0),
  total: z.number().min(0),
  status: z.enum(['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled']).default('pending'),
  orderType: z.enum(['dine-in', 'takeaway', 'delivery']),
  paymentStatus: z.enum(['pending', 'paid', 'failed']).default('pending'),
  notes: z.string().optional(),
})

// User Schema
export const UserSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  name: z.string().min(1, 'الاسم مطلوب'),
  role: z.enum(['super_admin', 'restaurant_admin', 'restaurant_staff']),
  companyId: z.string().optional(),
  restaurantId: z.string().optional(),
  permissions: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  lastLogin: z.date().optional(),
})

// Export types
export type CompanyType = z.infer<typeof CompanySchema>
export type RestaurantType = z.infer<typeof RestaurantSchema>
export type CategoryType = z.infer<typeof CategorySchema>
export type MenuItemType = z.infer<typeof MenuItemSchema>
export type OrderType = z.infer<typeof OrderSchema>
export type UserType = z.infer<typeof UserSchema>