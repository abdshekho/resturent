import { NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"
import { getAuthUser } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const user = getAuthUser(request as any)
    if (!user) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
    }

    if (!user.restaurantId) {
      return NextResponse.json({ error: "معرف المطعم غير موجود" }, { status: 400 })
    }

    const db = DatabaseService.getInstance()
    const menuItems = await db.getMenuItemsByRestaurant(user.restaurantId)
    
    console.log('Menu items found:', menuItems.length)
    return NextResponse.json(menuItems)
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = getAuthUser(request as any)
    if (!user || user.userType !== "restaurant-admin") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
    }

    const body = await request.json()
    const db = DatabaseService.getInstance()
    
    // Ensure restaurantId is set from authenticated user
    const menuItemData = {
      ...body,
      restaurantId: user.restaurantId,
      categoryId: body.categoryId
    }
    
    const menuItem = await db.createMenuItem(menuItemData)
    
    return NextResponse.json(menuItem)
  } catch (error) {
    console.error("Error creating menu item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}