import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

import { DatabaseService } from '@/lib/database'
import mongoose from 'mongoose'

const db = DatabaseService.getInstance()

export async function GET() {
  try {
    // في التطبيق الحقيقي، ستحتاج لتمرير restaurantId من الجلسة
    const restaurantId = new mongoose.Types.ObjectId('68c832d18c7b51ef8c81433b')
    const staff = await db.getUsersByRestaurant(restaurantId)
    return NextResponse.json(staff)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch staff' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, role, isActive,restaurantId } = body

    if (!name || !email || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const existingUser = await db.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    const ObjectIdrestaurantId = new mongoose.Types.ObjectId(restaurantId);

    console.log('🚀 ~ route.ts ~ POST ~ ObjectIdrestaurantId:', ObjectIdrestaurantId);

    const newStaff = await db.createUser({
      name,
      email,
      password: 'temp-password', // في التطبيق الحقيقي، يجب إرسال رابط لتعيين كلمة المرور
      role,
      restaurantId,
      permissions: role === 'restaurant_admin' ? ['all'] : ['orders'],
      isActive: isActive ?? true
    })

    return NextResponse.json(newStaff, { status: 201 })
  } catch (error) {

    console.error('🚀 ~ route.ts ~ POST ~ error:', error);

    return NextResponse.json(
      { error: 'Failed to create staff member' },
      { status: 500 }
    )
  }
}