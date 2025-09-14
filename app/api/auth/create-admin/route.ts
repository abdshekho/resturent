import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()
    console.log("Received data:", { name, email, password: "***" })

    if (!name || !email || !password) {
      return NextResponse.json({ message: "جميع الحقول مطلوبة" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    console.log("Connected to database")

    // Check if admin already exists
    const existingAdmin = await db.collection("admins").findOne({ email })
    console.log("Existing admin check:", existingAdmin)
    
    if (existingAdmin) {
      return NextResponse.json({ message: "المدير موجود بالفعل" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    console.log("Password hashed")

    // Create admin
    const adminData = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    console.log("Admin data to insert:", { ...adminData })
    
    const result = await db.collection("admins").insertOne(adminData)
    console.log("Insert result:", result)

    return NextResponse.json({
      message: "تم إنشاء حساب المدير بنجاح",
      adminId: result.insertedId,
    })
  } catch (error) {
    console.error("Create admin error:", error)
    return NextResponse.json({ message: "حدث خطأ في الخادم" }, { status: 500 })
  }
}