import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { Restaurant, User, Company } from "@/lib/models/mongoose"
import connectDB from "@/lib/mongoose"

export async function POST(request: NextRequest) {
  try {
    const { restaurantName, ownerName, email, phone, address, description, password } = await request.json()

    if (!restaurantName || !ownerName || !email || !phone || !address || !password) {
      return NextResponse.json({ message: "جميع الحقول المطلوبة يجب ملؤها" }, { status: 400 })
    }

    await connectDB()

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json({ message: "يوجد مستخدم مسجل بهذا البريد الإلكتروني بالفعل" }, { status: 400 })
    }

    // Hash the provided password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Get or create default company
    let company = await Company.findOne({})
    if (!company) {
      company = new Company({
        name: "Default Company",
        description: "Default company for restaurants",
        email: "admin@example.com",
        phone: "123456789",
        address: {
          street: "Default Street",
          city: "Default City",
          state: "Default State",
          country: "Default Country",
          zipCode: "12345"
        },
        settings: {
          allowRegistration: true,
          maxRestaurants: 100,
          subscriptionPlan: "basic"
        }
      })
      await company.save()
    }

    // Create restaurant
    const restaurant = new Restaurant({
      companyId: company._id,
      name: restaurantName,
      slug: restaurantName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, ""),
      description: description || "",
      cuisine: [],
      contact: {
        email,
        phone,
        address: {
          street: address.street || "",
          city: address.city || "",
          state: address.state || "",
          country: address.country || "",
          zipCode: address.zipCode || ""
        }
      },
      settings: {
        isActive: false, // pending approval
        acceptOrders: false,
        deliveryEnabled: false,
        pickupEnabled: true,
        operatingHours: {}
      },
      theme: {
        primaryColor: "#000000",
        secondaryColor: "#ffffff",
        fontFamily: "Arial"
      }
    })
    
    await restaurant.save()

    // Create user for restaurant owner
    const user = new User({
      email,
      password: hashedPassword,
      name: ownerName,
      role: "restaurant_admin",
      companyId: company._id,
      restaurantId: restaurant._id,
      permissions: [],
      isActive: false // pending approval
    })
    
    await user.save()

    // Restaurant registered successfully
    console.log(`Restaurant registered: ${email}`)

    return NextResponse.json({
      message: "تم تسجيل المطعم بنجاح. سيتم التواصل معك قريباً لتفعيل الحساب.",
      restaurantId: restaurant._id,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "حدث خطأ في الخادم" }, { status: 500 })
  }
}
