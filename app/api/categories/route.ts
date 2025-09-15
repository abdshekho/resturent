import { NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET() {
  try {
    const db = DatabaseService.getInstance()
    const categories = await db.getCategories()
    
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const db = DatabaseService.getInstance()
    
    const categoryData = {
      ...body,
      restaurantId: body.restaurantId
    }
    
    const category = await db.createCategory(categoryData)
    
    return NextResponse.json(category)
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}