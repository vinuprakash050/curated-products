'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Upload } from 'lucide-react'

interface ComingSoonImageUploadProps {
  currentImage?: string;
  onUpload: (imageUrl: string) => Promise<void>;
}

export default function ComingSoonImageUpload({ currentImage, onUpload }: ComingSoonImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      // Upload to ImgBB
      const formData = new FormData()
      formData.append('images', file)

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to upload image')
      }

      const imageUrl = result.imageUrls[0]
      console.log('Image uploaded to ImgBB:', imageUrl)
      setPreview(imageUrl)
      await onUpload(imageUrl)
      console.log('Image saved successfully')
      
      alert('Hero image updated successfully!')
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Hero Image</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Upload an image to display in the circular area on the homepage. You can change this regularly.
      </p>

      {preview ? (
        <div className="space-y-4">
          <div className="relative w-64 h-64 mx-auto">
            <Image
              src={preview}
              alt="Hero Image Preview"
              fill
              className="rounded-lg object-cover"
              unoptimized
            />
          </div>
          <label className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading...' : 'Change Image'}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </label>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF (MAX. 5MB)</p>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={uploading}
          />
        </label>
      )}

      {uploading && (
        <div className="mt-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Uploading...</p>
        </div>
      )}
    </div>
  )
}
