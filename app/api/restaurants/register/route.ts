import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { restaurantName, ownerName, email, phone, address, description } = await request.json()

    if (!restaurantName || !ownerName || !email || !phone || !address) {
      return NextResponse.json({ message: "جميع الحقول المطلوبة يجب ملؤها" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Check if restaurant with this email already exists
    const existingRestaurant = await db.collection("restaurants").findOne({
      "owner.email": email,
    })

    if (existingRestaurant) {
      return NextResponse.json({ message: "يوجد مطعم مسجل بهذا البريد الإلكتروني بالفعل" }, { status: 400 })
    }

    // Generate temporary password (will be sent via email in real implementation)
    const tempPassword = Math.random().toString(36).slice(-8)
    const hashedPassword = await bcrypt.hash(tempPassword, 12)

    // Create restaurant document
    const restaurant = {
      name: restaurantName,
      slug: restaurantName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, ""),
      description: description || "",
      address,
      phone,
      owner: {
        name: ownerName,
        email,
        password: hashedPassword,
      },
      status: "pending", // pending, active, suspended
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("restaurants").insertOne(restaurant)

    // In a real implementation, you would send an email with login credentials
    console.log(`Restaurant registered: ${email}, temp password: ${tempPassword}`)

    return NextResponse.json({
      message: "تم تسجيل المطعم بنجاح. سيتم التواصل معك قريباً لتفعيل الحساب.",
      restaurantId: result.insertedId,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "حدث خطأ في الخادم" }, { status: 500 })
  }
}
