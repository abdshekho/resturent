import connectDB from './mongoose'
import { Restaurant, Category, MenuItem, Order, User } from './models/mongoose'
import type { IRestaurant, ICategory, IMenuItem, IOrder, IUser } from './models/mongoose'
import { RestaurantSchema, CategorySchema, MenuItemSchema, OrderSchema, UserSchema } from './schemas'
import type { RestaurantType, CategoryType, MenuItemType, OrderType, UserType } from './schemas'

export class MongooseDatabaseService {
  private static instance: MongooseDatabaseService

  public static getInstance(): MongooseDatabaseService {
    if (!MongooseDatabaseService.instance) {
      MongooseDatabaseService.instance = new MongooseDatabaseService()
    }
    return MongooseDatabaseService.instance
  }

  private async connect() {
    await connectDB()
  }

  // Restaurant operations
  async createRestaurant(restaurantData: RestaurantType): Promise<IRestaurant> {
    await this.connect()
    const validatedData = RestaurantSchema.parse(restaurantData)
    const restaurant = new Restaurant(validatedData)
    return await restaurant.save()
  }

  async getRestaurantBySlug(slug: string): Promise<IRestaurant | null> {
    await this.connect()
    return await Restaurant.findOne({ slug })
  }

  async getRestaurantsByCompany(companyId: string): Promise<IRestaurant[]> {
    await this.connect()
    return await Restaurant.find({ companyId })
  }

  async getRestaurantById(id: string): Promise<IRestaurant | null> {
    await this.connect()
    return await Restaurant.findById(id)
  }

  // Category operations
  async createCategory(categoryData: CategoryType): Promise<ICategory> {
    await this.connect()
    const validatedData = CategorySchema.parse(categoryData)
    const category = new Category(validatedData)
    return await category.save()
  }

  async getCategories(): Promise<ICategory[]> {
    await this.connect()
    return await Category.find({}).sort({ sortOrder: 1 })
  }

  async getCategoriesByRestaurant(restaurantId: string): Promise<ICategory[]> {
    await this.connect()
    return await Category.find({ restaurantId, isActive: true }).sort({ sortOrder: 1 })
  }

  async updateCategory(id: string, categoryData: Partial<CategoryType>): Promise<ICategory | null> {
    await this.connect()
    return await Category.findByIdAndUpdate(id, categoryData, { new: true })
  }

  async deleteCategory(id: string): Promise<void> {
    await this.connect()
    await Category.findByIdAndDelete(id)
  }

  // Menu Item operations
  async createMenuItem(menuItemData: MenuItemType): Promise<IMenuItem> {
    await this.connect()
    const validatedData = MenuItemSchema.parse(menuItemData)
    const menuItem = new MenuItem(validatedData)
    return await menuItem.save()
  }

  async getMenuItemsByCategory(categoryId: string): Promise<IMenuItem[]> {
    await this.connect()
    return await MenuItem.find({ categoryId, isAvailable: true }).sort({ sortOrder: 1 })
  }

  async getMenuItemsByRestaurant(restaurantId: string): Promise<IMenuItem[]> {
    await this.connect()
    return await MenuItem.find({ restaurantId, isAvailable: true }).sort({ sortOrder: 1 })
  }

  async updateMenuItem(id: string, menuItemData: Partial<MenuItemType>): Promise<IMenuItem | null> {
    await this.connect()
    return await MenuItem.findByIdAndUpdate(id, menuItemData, { new: true })
  }

  async deleteMenuItem(id: string): Promise<void> {
    await this.connect()
    await MenuItem.findByIdAndDelete(id)
  }

  // Order operations
  async createOrder(orderData: OrderType): Promise<IOrder> {
    await this.connect()
    const validatedData = OrderSchema.parse(orderData)
    const order = new Order(validatedData)
    return await order.save()
  }

  async getOrdersByRestaurant(restaurantId: string, limit = 50): Promise<IOrder[]> {
    await this.connect()
    return await Order.find({ restaurantId }).sort({ createdAt: -1 }).limit(limit)
  }

  async updateOrderStatus(orderId: string, status: IOrder['status']): Promise<IOrder | null> {
    await this.connect()
    return await Order.findByIdAndUpdate(
      orderId,
      { status, updatedAt: new Date() },
      { new: true }
    )
  }

  // User operations
  async createUser(userData: UserType): Promise<IUser> {
    await this.connect()
    const validatedData = UserSchema.parse(userData)
    const user = new User(validatedData)
    return await user.save()
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    await this.connect()
    return await User.findOne({ email })
  }

  async getUsersByRestaurant(restaurantId: string): Promise<IUser[]> {
    await this.connect()
    return await User.find({ restaurantId })
  }

  // Dashboard stats methods
  async getRecentOrders(limit: number = 10): Promise<IOrder[]> {
    await this.connect()
    return await Order.find({}).sort({ createdAt: -1 }).limit(limit)
  }

  async getTodayOrdersCount(): Promise<number> {
    await this.connect()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    return await Order.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    })
  }

  async getTodayRevenue(): Promise<number> {
    await this.connect()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: today, $lt: tomorrow },
          status: { $ne: 'cancelled' }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ])
    
    return result[0]?.total || 0
  }

  async getTotalCustomersCount(): Promise<number> {
    await this.connect()
    return await Order.distinct('customerInfo.email').then(emails => emails.length)
  }

  async getPopularMenuItem(): Promise<IMenuItem | null> {
    await this.connect()
    const result = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.menuItemId',
          count: { $sum: '$items.quantity' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ])
    
    if (result.length === 0) return null
    
    return await MenuItem.findById(result[0]._id)
  }
}