import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const db = DatabaseService.getInstance()
    const resolverParams = await params;
    const restaurant = await db.getRestaurantBySlug(resolverParams.slug)

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 })
    }

    const menuItems = await db.getMenuItemsByRestaurant(restaurant._id!.toString())

    return NextResponse.json({ menuItems })
  } catch (error) {
    console.error("Error fetching restaurant menu:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}