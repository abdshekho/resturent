import { NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json()
    const resolvedParams = await params
    const orderId =  resolvedParams.id

    if (!orderId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const db = DatabaseService.getInstance()
    const updatedOrder = await db.updateOrderStatus(orderId, status)

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      message: "Order status updated successfully"
    })
  } catch (error) {
    console.error("Error updating order status:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}