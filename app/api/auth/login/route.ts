import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "@/lib/database"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const { email, password, userType } = await request.json()

    if (!email || !password || !userType) {
      return NextResponse.json({ message: "جميع الحقول مطلوبة" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Find user based on type
    let user
    if (userType === "super-admin") {
      user = await db.collection("admins").findOne({ email })
    } else {
      user = await db.collection("restaurants").findOne({
        "owner.email": email,
      })
    }

    if (!user) {
      return NextResponse.json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }, { status: 401 })
    }

    // Check password
    const passwordField = userType === "super-admin" ? user.password : user.owner.password
    const isPasswordValid = await bcrypt.compare(password, passwordField)

    if (!isPasswordValid) {
      return NextResponse.json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: userType === "super-admin" ? user.email : user.owner.email,
        userType,
        restaurantId: userType === "restaurant-admin" ? user._id : null,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    )

    // Return user data (without password)
    const userData =
      userType === "super-admin"
        ? { id: user._id, email: user.email, name: user.name, userType }
        : {
            id: user._id,
            email: user.owner.email,
            name: user.owner.name,
            userType,
            restaurantId: user._id,
            restaurantName: user.name,
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
