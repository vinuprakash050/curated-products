'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Header from '@/components/Header'
import ProductForm from '@/components/admin/ProductForm'
import { Product, ProductFormData } from '@/types/product'
import { getProducts, updateProduct } from '@/lib/firestore'

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts()
        const foundProduct = products.find(p => p.id === params.id)
        
        if (foundProduct) {
          setProduct(foundProduct)
        } else {
          router.push('/admin')
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        router.push('/admin')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id, router])

  const handleUpdateProduct = async (formData: ProductFormData) => {
    if (!product?.id) return

    try {
      let imageUrls = product.imageUrls || [] // Keep existing images by default
      
      // Upload new images to ImgBB if provided
      if (formData.images && formData.images.length > 0) {
        const uploadFormData = new FormData()
        formData.images.forEach((image) => {
          uploadFormData.append('images', image)
        })
        
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: uploadFormData,
        })
        
        const result = await response.json()
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to upload images')
        }
        
        // Add new images to existing ones
        imageUrls = [...imageUrls, ...result.imageUrls]
      }

      // Update product in Firestore
      const productData = {
        name: formData.name,
        imageUrls,
        price: formData.price,
        category: formData.category,
        description: formData.description,
        affiliateUrl: formData.affiliateUrl,
        featured: formData.featured,
      }

      await updateProduct(product.id, productData)
      
      alert('Product updated successfully!')
      router.push('/admin')
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Error updating product. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-red-600">Product not found</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Product</h1>
          <p className="text-gray-600">Update the product information</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <ProductForm 
            product={product}
            onSubmit={handleUpdateProduct}
            isEditing={true}
          />
        </div>
      </main>
    </div>
  )
}