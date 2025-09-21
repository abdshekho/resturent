import { NextRequest, NextResponse } from 'next/server'
import { IDriveE2Uploader } from '@/lib/idrive-uploader'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const categoryName = formData.get('categoryName') as string

    if (!file || !categoryName) {
      return NextResponse.json({ error: 'File and category name are required' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploader = new IDriveE2Uploader()
    const imageUrl = await uploader.uploadMenuItemImage(buffer, file.name, categoryName)

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error('Error uploading menu item image:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}