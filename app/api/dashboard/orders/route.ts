import { NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter')
    const fromDate = searchParams.get('from')
    const toDate = searchParams.get('to')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    
    let dateFilter = {}
    const now = new Date()
    
    if (fromDate && toDate) {
      const startDate = new Date(fromDate)
      const endDate = new Date(toDate)
      endDate.setHours(23, 59, 59, 999)
      dateFilter = { createdAt: { $gte: startDate, $lte: endDate } }
    } else if (filter === 'today') {
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
      dateFilter = { createdAt: { $gte: startOfDay, $lt: endOfDay } }
    } else if (filter === 'week') {
      const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      dateFilter = { createdAt: { $gte: startOfWeek } }
    } else if (filter === 'month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      dateFilter = { createdAt: { $gte: startOfMonth } }
    }

    const db = DatabaseService.getInstance()
    const result = await db.getOrdersByRestaurant(decoded.restaurantId, page, limit, dateFilter)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}