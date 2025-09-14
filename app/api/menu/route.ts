import { NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET() {
  try {
    const db = DatabaseService.getInstance()
    const menuItems = await db.getMenuItems()
    
    return NextResponse.json(menuItems)
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const db = DatabaseService.getInstance()
    
    const menuItem = await db.createMenuItem(body)
    
    return NextResponse.json(menuItem)
  } catch (error) {
    console.error("Error creating menu item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}