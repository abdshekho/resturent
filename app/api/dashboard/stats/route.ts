import { NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET() {
  try {
    const db = DatabaseService.getInstance()
    
    const [todayOrders, todayRevenue, totalCustomers, popularItem] = await Promise.all([
      db.getTodayOrdersCount(),
      db.getTodayRevenue(),
      db.getTotalCustomersCount(),
      db.getPopularMenuItem()
    ])
    
    const stats = {
      todayOrders,
      todayRevenue,
      totalCustomers,
      popularItem: popularItem?.name || ""
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}