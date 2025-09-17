import { NextRequest, NextResponse } from "next/server"
import { Restaurant } from "@/lib/models/mongoose"
import { DatabaseService } from "@/lib/database"

export async function GET() {
  try {
    const db = DatabaseService.getInstance()
    
    const totalRestaurants = await Restaurant.countDocuments({})
    const activeRestaurants = await Restaurant.countDocuments({ 'settings.isActive': true })
    
    // حساب إحصائيات أساسية
    const stats = {
      totalRestaurants,
      activeRestaurants,
      inactiveRestaurants: totalRestaurants - activeRestaurants,
      totalUsers: 0, // يمكن إضافة نموذج المستخدمين لاحقاً
      totalOrders: 0, // يمكن إضافة نموذج الطلبات لاحقاً
      totalRevenue: 0, // يمكن حسابه من الطلبات لاحقاً
    }
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'فشل في جلب الإحصائيات' },
      { status: 500 }
    )
  }
}