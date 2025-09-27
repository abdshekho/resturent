import mongoose, { Schema, Document } from 'mongoose'



// Restaurant Model
interface IRestaurant extends Document {
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
  tamplate:string
  createdAt: Date
  updatedAt: Date
}

const RestaurantSchema = new Schema<IRestaurant>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  logo: String,
  coverImage: String,
  cuisine: [String],
  contact: {
    email: { type: String},
    phone: { type: String},
    address: {
      street: { type: String},
      city: { type: String},
      state: { type: String},
      country: { type: String},
      zipCode: { type: String},
    },
  },
  settings: {
    isActive: { type: Boolean, default: true },
    acceptOrders: { type: Boolean, default: true },
    deliveryEnabled: { type: Boolean, default: false },
    pickupEnabled: { type: Boolean, default: true },
    operatingHours: { type: Schema.Types.Mixed, default: {} },
  },
  theme: {
    primaryColor: { type: String, default: '#000000' },
    secondaryColor: { type: String, default: '#ffffff' },
    fontFamily: { type: String, default: 'Arial' },
  },
}, { timestamps: true, collection: 'restaurants' })

// Category Model
interface ICategory extends Document {
  restaurantId: mongoose.Types.ObjectId
  name: string
  nameAr: string
  description?: string
  descriptionAr?: string
  image?: string
  sortOrder: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<ICategory>({
  restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  description: String,
  descriptionAr: String,
  image: String,
  sortOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true, collection: 'categories' })

// MenuItem Model
interface IMenuItem extends Document {
  restaurantId: mongoose.Types.ObjectId
  categoryId: mongoose.Types.ObjectId
  name: string
  nameAr?: string
  description: string
  descriptionAr?: string
  price: number
  image?: string
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
  createdAt: Date
  updatedAt: Date
}

const MenuItemSchema = new Schema<IMenuItem>({
  restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true },
  nameAr:  { type: String, required: true },
  description: { type: String, required: true },
  descriptionAr:  { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  image: String,
  options: [{
    name: String,
    type: { type: String, enum: ['single', 'multiple'] },
    required: Boolean,
    choices: [{
      name: String,
      price: Number,
    }],
  }],
  isAvailable: { type: Boolean, default: true },
  isPopular: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true, collection: 'menuitems' })

// Order Model
interface IOrder extends Document {
  restaurantId: mongoose.Types.ObjectId
  orderNumber: string
  customerInfo: {
    name: string
    email?: string
    phone: string
    tableNumber?: string
  }
  items: {
    menuItemId: mongoose.Types.ObjectId
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
  createdAt: Date
  updatedAt: Date
}

const OrderSchema = new Schema<IOrder>({
  restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  orderNumber: { type: String, required: true, unique: true },
  customerInfo: {
    name: { type: String, required: true },
    email: String,
    phone: { type: String, required: true },
    tableNumber: String,
  },
  items: [{
    menuItemId: { type: Schema.Types.ObjectId, ref: 'MenuItem' },
    name: String,
    price: Number,
    quantity: { type: Number, min: 1 },
    selectedOptions: [{
      name: String,
      choice: String,
      price: Number,
    }],
    specialInstructions: String,
  }],
  subtotal: { type: Number, required: true, min: 0 },
  tax: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'], default: 'pending' },
  orderType: { type: String, enum: ['dine-in', 'takeaway', 'delivery'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  notes: String,
}, { timestamps: true, collection: 'orders' })

// User Model
interface IUser extends Document {
  email: string
  password: string
  name: string
  role: 'super_admin' | 'restaurant_admin' | 'restaurant_staff'
  restaurantId?: mongoose.Types.ObjectId
  permissions: string[]
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['super_admin', 'restaurant_admin', 'restaurant_staff'], required: true },
  restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  permissions: [String],
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
}, { timestamps: true, collection: 'users' })

// Export models
export const Restaurant = mongoose.models.Restaurant || mongoose.model<IRestaurant>('Restaurant', RestaurantSchema)
export const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema)
export const MenuItem = mongoose.models.MenuItem || mongoose.model<IMenuItem>('MenuItem', MenuItemSchema)
export const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

// Export interfaces
export type { IRestaurant, ICategory, IMenuItem, IOrder, IUser }