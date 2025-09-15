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

    // if (!restaurant.settings.isActive) {
    //   return NextResponse.json({ error: "Restaurant is not active" }, { status: 403 })
    // }

    // Get categories and menu items
    const [categories, menuItems] = await Promise.all([
      db.getCategoriesByRestaurant(restaurant._id!.toString()),
      db.getMenuItemsByRestaurant(restaurant._id!.toString()),
    ])

    return NextResponse.json({
      restaurant,
      categories,
      menuItems,
    })
  } catch (error) {
    console.error("Error fetching restaurant data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
