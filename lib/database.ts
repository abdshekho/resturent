import { getDatabase } from "./mongodb"
import type { Company, Restaurant, Category, MenuItem, Order, User } from "./models/Company"
import type { ObjectId, Db } from "mongodb"

export async function connectToDatabase(): Promise<{ db: Db }> {
  const db = await getDatabase()
  return { db }
}

export class DatabaseService {
  private static instance: DatabaseService

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService()
    }
    return DatabaseService.instance
  }

  // Company operations
  async createCompany(company: Omit<Company, "_id" | "createdAt" | "updatedAt">): Promise<Company> {
    const { db } = await connectToDatabase()
    const now = new Date()
    const newCompany = {
      ...company,
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.collection<Company>("companies").insertOne(newCompany)
    return { ...newCompany, _id: result.insertedId }
  }

  async getCompany(): Promise<Company | null> {
    const { db } = await connectToDatabase()
    return await db.collection<Company>("companies").findOne({})
  }

  // Restaurant operations
  async createRestaurant(restaurant: Omit<Restaurant, "_id" | "createdAt" | "updatedAt">): Promise<Restaurant> {
    const { db } = await connectToDatabase()
    const now = new Date()
    const newRestaurant = {
      ...restaurant,
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.collection<Restaurant>("restaurants").insertOne(newRestaurant)
    return { ...newRestaurant, _id: result.insertedId }
  }

  async getRestaurantBySlug(slug: string): Promise<Restaurant | null> {
    const { db } = await connectToDatabase()
    return await db.collection<Restaurant>("restaurants").findOne({ slug })
  }

  async getRestaurantsByCompany(companyId: ObjectId): Promise<Restaurant[]> {
    const { db } = await connectToDatabase()
    return await db.collection<Restaurant>("restaurants").find({ companyId }).toArray()
  }

  async getRestaurantById(id: ObjectId): Promise<Restaurant | null> {
    const { db } = await connectToDatabase()
    return await db.collection<Restaurant>("restaurants").findOne({ _id: id })
  }

  // Category operations
  async createCategory(category: Omit<Category, "_id" | "createdAt" | "updatedAt">): Promise<Category> {
    const { db } = await connectToDatabase()
    const now = new Date()
    const newCategory = {
      ...category,
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.collection<Category>("categories").insertOne(newCategory)
    return { ...newCategory, _id: result.insertedId }
  }

  async getCategories(): Promise<Category[]> {
    const { db } = await connectToDatabase()
    return await db
      .collection<Category>("categories")
      .find({})
      .sort({ sortOrder: 1 })
      .toArray()
  }

  async getCategoriesByRestaurant(restaurantId: ObjectId): Promise<Category[]> {
    const { db } = await connectToDatabase()
    return await db
      .collection<Category>("categories")
      .find({ restaurantId, isActive: true })
      .sort({ sortOrder: 1 })
      .toArray()
  }

  // Menu Item operations
  async createMenuItem(menuItem: Omit<MenuItem, "_id" | "createdAt" | "updatedAt">): Promise<MenuItem> {
    const { db } = await connectToDatabase()
    const now = new Date()
    const newMenuItem = {
      ...menuItem,
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.collection<MenuItem>("menu_items").insertOne(newMenuItem)
    return { ...newMenuItem, _id: result.insertedId }
  }

  async getMenuItemsByCategory(categoryId: ObjectId): Promise<MenuItem[]> {
    const { db } = await connectToDatabase()
    return await db
      .collection<MenuItem>("menu_items")
      .find({ categoryId, isAvailable: true })
      .sort({ sortOrder: 1 })
      .toArray()
  }

  async getMenuItemsByRestaurant(restaurantId: ObjectId): Promise<MenuItem[]> {
    const { db } = await connectToDatabase()
    return await db
      .collection<MenuItem>("menu_items")
      .find({ restaurantId, isAvailable: true })
      .sort({ sortOrder: 1 })
      .toArray()
  }

  // Order operations
  async createOrder(order: Omit<Order, "_id" | "createdAt" | "updatedAt">): Promise<Order> {
    const { db } = await connectToDatabase()
    const now = new Date()
    const newOrder = {
      ...order,
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.collection<Order>("orders").insertOne(newOrder)
    return { ...newOrder, _id: result.insertedId }
  }

  async getOrdersByRestaurant(restaurantId: ObjectId, limit = 50): Promise<Order[]> {
    const { db } = await connectToDatabase()
    return await db.collection<Order>("orders").find({ restaurantId }).sort({ createdAt: -1 }).limit(limit).toArray()
  }

  async updateOrderStatus(orderId: ObjectId, status: Order["status"]): Promise<void> {
    const { db } = await connectToDatabase()
    await db.collection<Order>("orders").updateOne({ _id: orderId }, { $set: { status, updatedAt: new Date() } })
  }

  // User operations
  async createUser(user: Omit<User, "_id" | "createdAt" | "updatedAt">): Promise<User> {
    const { db } = await connectToDatabase()
    const now = new Date()
    const newUser = {
      ...user,
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.collection<User>("users").insertOne(newUser)
    return { ...newUser, _id: result.insertedId }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const { db } = await connectToDatabase()
    return await db.collection<User>("users").findOne({ email })
  }

  async getUsersByRestaurant(restaurantId: ObjectId): Promise<User[]> {
    const { db } = await connectToDatabase()
    return await db.collection<User>("users").find({ restaurantId }).toArray()
  }
}
