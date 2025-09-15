const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myRestaurents')

// Define schemas
const CompanySchema = new mongoose.Schema({
  name: String,
  description: String,
  email: String,
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  settings: {
    allowRegistration: { type: Boolean, default: true },
    maxRestaurants: { type: Number, default: 100 },
    subscriptionPlan: { type: String, default: 'basic' }
  }
}, { timestamps: true, collection: 'companies' })

const RestaurantSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  name: String,
  slug: String,
  description: String,
  cuisine: [String],
  contact: {
    email: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    }
  },
  settings: {
    isActive: { type: Boolean, default: true },
    acceptOrders: { type: Boolean, default: true },
    deliveryEnabled: { type: Boolean, default: false },
    pickupEnabled: { type: Boolean, default: true },
    operatingHours: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  theme: {
    primaryColor: { type: String, default: '#000000' },
    secondaryColor: { type: String, default: '#ffffff' },
    fontFamily: { type: String, default: 'Arial' }
  }
}, { timestamps: true, collection: 'restaurants' })

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String,
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  permissions: [String],
  isActive: { type: Boolean, default: true }
}, { timestamps: true, collection: 'users' })

const CategorySchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  name: String,
  description: String,
  sortOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true, collection: 'categories' })

const MenuItemSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  name: String,
  description: String,
  price: Number,
  ingredients: [String],
  isAvailable: { type: Boolean, default: true },
  isPopular: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true, collection: 'menuitems' })

const Company = mongoose.model('Company', CompanySchema)
const Restaurant = mongoose.model('Restaurant', RestaurantSchema)
const User = mongoose.model('User', UserSchema)
const Category = mongoose.model('Category', CategorySchema)
const MenuItem = mongoose.model('MenuItem', MenuItemSchema)

async function seedData() {
  try {
    // Clear existing data
    await Company.deleteMany({})
    await Restaurant.deleteMany({})
    await User.deleteMany({})
    await Category.deleteMany({})
    await MenuItem.deleteMany({})

    // Create company
    const company = new Company({
      name: 'شركة المطاعم',
      description: 'شركة إدارة المطاعم',
      email: 'admin@restaurants.com',
      phone: '123456789',
      address: {
        street: 'شارع الملك فهد',
        city: 'الرياض',
        state: 'الرياض',
        country: 'السعودية',
        zipCode: '12345'
      }
    })
    await company.save()

    // Create restaurant
    const restaurant = new Restaurant({
      companyId: company._id,
      name: 'مطعم الأصالة',
      slug: 'asala-restaurant',
      description: 'مطعم للأكلات الشعبية',
      cuisine: ['عربي', 'شعبي'],
      contact: {
        email: 'info@asala.com',
        phone: '987654321',
        address: {
          street: 'شارع العليا',
          city: 'الرياض',
          state: 'الرياض',
          country: 'السعودية',
          zipCode: '12345'
        }
      }
    })
    await restaurant.save()

    // Create admin user
    const hashedPassword = await bcrypt.hash('123456', 12)
    const user = new User({
      email: 'admin@asala.com',
      password: hashedPassword,
      name: 'مدير المطعم',
      role: 'restaurant_admin',
      companyId: company._id,
      restaurantId: restaurant._id,
      permissions: []
    })
    await user.save()

    // Create categories
    const appetizers = new Category({
      restaurantId: restaurant._id,
      name: 'المقبلات',
      description: 'مقبلات متنوعة',
      sortOrder: 1
    })
    await appetizers.save()

    const mainDishes = new Category({
      restaurantId: restaurant._id,
      name: 'الأطباق الرئيسية',
      description: 'أطباق رئيسية شهية',
      sortOrder: 2
    })
    await mainDishes.save()

    // Create menu items
    const menuItems = [
      {
        restaurantId: restaurant._id,
        categoryId: appetizers._id,
        name: 'حمص بالطحينة',
        description: 'حمص طازج مع الطحينة والزيت',
        price: 15,
        ingredients: ['حمص', 'طحينة', 'زيت زيتون'],
        sortOrder: 1
      },
      {
        restaurantId: restaurant._id,
        categoryId: appetizers._id,
        name: 'متبل',
        description: 'متبل باذنجان مشوي',
        price: 12,
        ingredients: ['باذنجان', 'طحينة', 'ثوم'],
        sortOrder: 2
      },
      {
        restaurantId: restaurant._id,
        categoryId: mainDishes._id,
        name: 'كبسة لحم',
        description: 'كبسة لحم بالخضار والتوابل',
        price: 45,
        ingredients: ['أرز', 'لحم', 'خضار', 'توابل'],
        isPopular: true,
        sortOrder: 1
      },
      {
        restaurantId: restaurant._id,
        categoryId: mainDishes._id,
        name: 'مندي دجاج',
        description: 'مندي دجاج مع الأرز المدخن',
        price: 35,
        ingredients: ['دجاج', 'أرز', 'توابل'],
        sortOrder: 2
      }
    ]

    for (const item of menuItems) {
      const menuItem = new MenuItem(item)
      await menuItem.save()
    }

    console.log('تم إنشاء البيانات التجريبية بنجاح!')
    console.log('بيانات تسجيل الدخول:')
    console.log('البريد الإلكتروني: admin@asala.com')
    console.log('كلمة المرور: 123456')
    
    process.exit(0)
  } catch (error) {
    console.error('خطأ في إنشاء البيانات:', error)
    process.exit(1)
  }
}

seedData()