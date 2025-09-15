import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User, Restaurant } from "@/lib/models/mongoose"
import connectDB from "@/lib/mongoose"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const { email, password, userType } = await request.json()

    if (!email || !password || !userType) {
      return NextResponse.json({ message: "جميع الحقول مطلوبة" }, { status: 400 })
    }

    await connectDB()

    // Find user based on type
    let user
    if (userType === "super-admin") {
      user = await User.findOne({ email, role: "super_admin" })
    } else {
      user = await User.findOne({ email, role: { $in: ["restaurant_admin", "restaurant_staff"] } })
    }

    if (!user) {
      return NextResponse.json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }, { status: 401 })
    }

    // Check password
    const passwordField = user.password

    
    const isPasswordValid = await bcrypt.compare(password, passwordField)
    
    console.log('🚀 ~ route.ts ~ POST ~ passwordField:', passwordField);
    console.log('🚀 ~ route.ts ~ POST ~ isPasswordValid:', isPasswordValid);


    if (!isPasswordValid) {
      return NextResponse.json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        userType,
        restaurantId: user.restaurantId,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    )

    // Get restaurant data if needed
    let restaurant = null
    if (user.restaurantId) {
      restaurant = await Restaurant.findById(user.restaurantId)
    }

    // Return user data (without password)
    const userData = {
      id: user._id,
      email: user.email,
      name: user.name,
      userType,
      restaurantId: user.restaurantId,
      restaurantName: restaurant?.name,
    }

    return NextResponse.json({
      message: "تم تسجيل الدخول بنجاح",
      token,
      user: userData,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "حدث خطأ في الخادم" }, { status: 500 })
  }
}
