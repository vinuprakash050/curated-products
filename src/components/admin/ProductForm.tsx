'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { ProductFormData, Product } from '@/types/product'
import MarkdownDescription from '@/components/MarkdownDescription'

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductFormData) => Promise<void>;
  isEditing?: boolean;
}

export default function ProductForm({ product, onSubmit, isEditing = false }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || '',
    images: [],
    price: product?.price || '',
    category: product?.category || '',
    description: product?.description || '',
    affiliateUrl: product?.affiliateUrl || '',
    featured: product?.featured || false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    product?.imageUrls || []
  )
  // Track existing image URLs that should be kept
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(
    product?.imageUrls || []
  )

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const availableSlots = 5 - imagePreviews.length
    
    if (files.length > availableSlots) {
      alert(`You can only add ${availableSlots} more images. Maximum 5 images per product.`)
      return
    }

    setFormData({ ...formData, images: [...formData.images, ...files] })
    
    // Create previews for new files
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })

    // Clear the input
    e.target.value = ''
  }

  const removeImage = (index: number) => {
    const preview = imagePreviews[index]
    
    // Check if it's an existing image URL or a new local preview
    const existingIndex = existingImageUrls.indexOf(preview)
    
    if (existingIndex !== -1) {
      // It's an existing image - remove from existingImageUrls
      setExistingImageUrls(prev => prev.filter((_, i) => i !== existingIndex))
    } else {
      // It's a new image - find and remove from formData.images
      const newImageStartIndex = existingImageUrls.length
      const fileIndex = index - newImageStartIndex
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== fileIndex)
      }))
    }
    
    // Remove from previews
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const setPrimaryImage = (index: number) => {
    if (index === 0) return // Already primary
    
    // Reorder all previews
    setImagePreviews(prev => {
      const newPreviews = [...prev]
      const [item] = newPreviews.splice(index, 1)
      newPreviews.unshift(item)
      return newPreviews
    })
    
    // Determine if this is an existing image or new image
    const preview = imagePreviews[index]
    const isExistingImage = existingImageUrls.includes(preview)
    
    if (isExistingImage) {
      // Reorder existingImageUrls
      setExistingImageUrls(prev => {
        const existingIndex = prev.indexOf(preview)
        const newUrls = [...prev]
        const [item] = newUrls.splice(existingIndex, 1)
        newUrls.unshift(item)
        return newUrls
      })
    } else {
      // It's a new image - reorder formData.images
      // Find the position of this image in the new images array
      const newImagesStartIndex = existingImageUrls.length
      const fileIndex = index - newImagesStartIndex
      
      setFormData(prev => {
        const newImages = [...prev.images]
        const [item] = newImages.splice(fileIndex, 1)
        newImages.unshift(item)
        return { ...prev, images: newImages }
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (imagePreviews.length === 0 && !isEditing) {
      alert('Please add at least one image.')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Create a mapping of previews to their sources (existing URL or new File)
      const orderedImages: (string | File)[] = imagePreviews.map(preview => {
        // Check if it's an existing image
        if (existingImageUrls.includes(preview)) {
          return preview // Return the URL
        } else {
          // It's a new image - find the corresponding File
          const previewIndex = imagePreviews.indexOf(preview)
          const fileIndex = imagePreviews.slice(0, previewIndex).filter(p => !existingImageUrls.includes(p)).length
          return formData.images[fileIndex]
        }
      })
      
      // Separate into existing URLs and new Files in the correct order
      const orderedExistingUrls = orderedImages.filter(item => typeof item === 'string') as string[]
      const orderedNewFiles = orderedImages.filter(item => item instanceof File) as File[]
      
      // Add ordered data to formData
      const submitData = {
        ...formData,
        images: orderedNewFiles,
        existingImageUrls: orderedExistingUrls
      }
      
      await onSubmit(submitData)
      
      // Reset form if not editing
      if (!isEditing) {
        setFormData({
          name: '',
          images: [],
          price: '',
          category: '',
          description: '',
          affiliateUrl: '',
          featured: false,
        })
        setImagePreviews([])
        setExistingImageUrls([])
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      {/* Product Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Images (Max 5)
        </label>
        
        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <div className={`aspect-square rounded-md overflow-hidden border-2 ${index === 0 ? 'border-blue-500' : 'border-gray-300'}`}>
                  <Image
                    src={preview}
                    alt={`Product image ${index + 1}`}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                {index === 0 && (
                  <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
                    Primary
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex flex-col items-center justify-center gap-2">
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => setPrimaryImage(index)}
                      className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                    >
                      Set as Primary
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Images Button */}
        {imagePreviews.length < 5 && (
          <div className="flex items-center space-x-4">
            <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500 transition-colors">
              <div className="text-center">
                <Plus className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                <span className="text-sm text-gray-500">Add Images</span>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <div className="text-sm text-gray-500">
              <p>{imagePreviews.length} / 5 images</p>
              <p>Click to add {5 - imagePreviews.length} more</p>
            </div>
          </div>
        )}
      </div>

      {/* Price */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Price (without ₹ symbol)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 text-lg">₹</span>
          </div>
          <input
            type="text"
            id="price"
            required
            placeholder="1,299"
            className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={formData.price.replace(/[₹]/g, '')}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <input
          type="text"
          id="category"
          required
          placeholder="Tech, Home, Fashion, Fitness, Travel"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description (Markdown supported)
        </label>
        <div className="space-y-2">
          <textarea
            id="description"
            required
            rows={6}
            placeholder="Enter product description... You can use markdown:&#10;&#10;**Bold text**&#10;*Italic text*&#10;- Bullet point&#10;1. Numbered list&#10;[Link](https://example.com)&#10;&#10;## Features&#10;- Feature 1&#10;- Feature 2"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-vertical"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          {formData.description && (
            <div className="border border-gray-200 dark:border-gray-600 rounded-md p-3 bg-gray-50 dark:bg-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">Preview:</p>
              <MarkdownDescription 
                content={formData.description} 
                isPreview={true}
              />
            </div>
          )}
        </div>
      </div>

      {/* Amazon Affiliate URL */}
      <div>
        <label htmlFor="affiliateUrl" className="block text-sm font-medium text-gray-700 mb-2">
          Amazon Affiliate URL
        </label>
        <input
          type="url"
          id="affiliateUrl"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.affiliateUrl}
          onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
        />
      </div>

      {/* Featured */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
        />
        <label htmlFor="featured" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Featured Product
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Processing...' : isEditing ? 'Update Product' : 'Publish Product'}
      </button>
    </form>
  )
}