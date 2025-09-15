import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { restaurantId, customerInfo, items, orderType, notes } = body

    // Validate required fields
    if (!restaurantId || !customerInfo?.name || !customerInfo?.phone || !items?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = DatabaseService.getInstance()

    // Verify restaurant exists and is active
    const restaurant = await db.getRestaurantById(restaurantId)
    if (!restaurant || !restaurant.settings.isActive || !restaurant.settings.acceptOrders) {
      return NextResponse.json({ error: "Restaurant is not accepting orders" }, { status: 403 })
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}`

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.15 // 15% VAT
    const total = subtotal + tax

    // Create order
    const order = await db.createOrder({
      restaurantId,
      orderNumber,
      customerInfo,
      items,
      subtotal,
      tax,
      total,
      status: "pending",
      orderType: orderType || "dine-in",
      paymentStatus: "pending",
      notes,
    })

    return NextResponse.json({
      success: true,
      order,
      message: "Order placed successfully",
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
