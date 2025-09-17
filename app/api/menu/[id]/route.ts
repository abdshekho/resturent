import { NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    console.log('🚀 ~ route.ts ~ PUT ~ body:', body);

    const db = DatabaseService.getInstance()
    const resolvedparams = await params;
    const menuItem = await db.updateMenuItem(resolvedparams.id, body)
    
    return NextResponse.json(menuItem)
  } catch (error) {
    console.error("Error updating menu item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = DatabaseService.getInstance()
    
    await db.deleteMenuItem(params.id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting menu item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}