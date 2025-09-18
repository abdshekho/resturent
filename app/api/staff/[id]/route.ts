import { NextRequest, NextResponse } from 'next/server'

import { DatabaseService } from '@/lib/database'

const db = DatabaseService.getInstance()

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { name, email, role, isActive } = body

    const existingUser = await db.getUserByEmail(email)
    if (existingUser && existingUser._id?.toString() !== id) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    const updatedUser = await db.updateUser(id, {
      name,
      email,
      role,
      isActive,
      permissions: role === 'restaurant_admin' ? ['all'] : ['orders']
    })

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Staff member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update staff member' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    await db.deleteUser(id)
    return NextResponse.json({ message: 'Staff member deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete staff member' },
      { status: 500 }
    )
  }
}