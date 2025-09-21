"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, X, Image } from 'lucide-react'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onFileSelect: (file: File | null) => void
  uploading?: boolean
  label?: string
}

export function ImageUpload({ 
  value, 
  onChange, 
  onFileSelect, 
  uploading = false,
  label = "صورة" 
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onChange('')
    onFileSelect(null)
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {preview ? (
        <div className="relative inline-block">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-32 h-32 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
            onClick={handleRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Image className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <Label htmlFor="image-upload" className="cursor-pointer">
              <span className="text-sm text-gray-600">اضغط لاختيار صورة</span>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
              />
            </Label>
          </div>
        </div>
      )}
      
      {uploading && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Upload className="h-4 w-4 animate-spin" />
          جاري الرفع...
        </div>
      )}
    </div>
  )
}