import { NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"
import { Restaurant } from "@/lib/models/mongoose"

export async function GET() {
  try {
    const db = DatabaseService.getInstance()
    
    const restaurants = await Restaurant.find({})
      .select('name slug description cuisine contact settings logo createdAt')
      .sort({ createdAt: -1 })
    
    return NextResponse.json(restaurants)
  } catch (error) {
    console.error('Error fetching restaurants:', error)
    return NextResponse.json(
      { error: 'فشل في جلب بيانات المطاعم' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = DatabaseService.getInstance()
    const data = await request.json()
    
    const restaurant = new Restaurant({
      name: data.name,
      slug: data.slug,
      description: data.description,
      cuisine: data.cuisine,
      contact: data.contact,
      settings: data.settings,
      theme: data.theme
    })
    
    await restaurant.save()
    
    return NextResponse.json({ success: true, restaurant })
  } catch (error) {
    console.error('Error creating restaurant:', error)
    return NextResponse.json(
      { error: 'فشل في إنشاء المطعم' },
      { status: 500 }
    )
  }
}