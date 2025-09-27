import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const db = DatabaseService.getInstance()
    // للتبسيط، سنأخذ أول مطعم - يمكن تحسين هذا لاحقاً بناءً على المستخدم المسجل
    const restaurant = await db.getRestaurantBySlug("asala")

    console.log('🚀 ~ route.ts ~ GET ~ restaurant:', restaurant);

    
    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 })
    }
    
    return NextResponse.json({
      restaurant: {
        name: restaurant.name,
        description: restaurant.description,
        contact: {
          phone: restaurant.contact?.phone || "",
          email: restaurant.contact?.email || "",
          address: {
            street: restaurant.contact?.address?.street || "",
            city: restaurant.contact?.address?.city || "",
            state: restaurant.contact?.address?.state || "",
            country: restaurant.contact?.address?.country || "",
            zipCode: restaurant.contact?.address?.zipCode || ""
          }
        },
        settings: {
          operatingHours: {
            monday: {
              open: restaurant.settings?.operatingHours?.monday?.open || "09:00",
              close: restaurant.settings?.operatingHours?.monday?.close || "23:00",
              isOpen: restaurant.settings?.operatingHours?.monday?.isOpen || true
            }
          }
        }
      }
    })
  } catch (error) {
    console.error("Error fetching restaurant settings:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const db = DatabaseService.getInstance()
    const body = await request.json()
    
    const restaurant = await db.getRestaurantBySlug("asala")
    
    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 })
    }
    
    await restaurant.updateOne({
      name: body.name,
      description: body.description,
      "contact.phone": body.contact.phone,
      "contact.email": body.contact.email,
      "contact.address.street": body.contact.address.street,
      "contact.address.city": body.contact.address.city,
      "contact.address.state": body.contact.address.state,
      "contact.address.country": body.contact.address.country,
      "contact.address.zipCode": body.contact.address.zipCode,
      "settings.operatingHours.monday.open": body.settings.operatingHours.monday.open,
      "settings.operatingHours.monday.close": body.settings.operatingHours.monday.close,
      updatedAt: new Date()
    })

    return NextResponse.json({ 
      success: true, 
      message: "تم حفظ البيانات بنجاح" 
    })
  } catch (error) {
    console.error("Error updating restaurant settings:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}