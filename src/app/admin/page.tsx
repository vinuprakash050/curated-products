'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import Header from '@/components/Header'
import AdminLogin from '@/components/admin/AdminLogin'
import ProductForm from '@/components/admin/ProductForm'
import ProductTable from '@/components/admin/ProductTable'
import ComingSoonImageUpload from '@/components/admin/ComingSoonImageUpload'
import { Product, ProductFormData } from '@/types/product'
import { getProducts, createProduct, deleteProduct, getSiteSettings, updateComingSoonImage } from '@/lib/firestore'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [comingSoonImage, setComingSoonImage] = useState<string | undefined>(undefined)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin-auth')
        if (response.ok) {
          setIsAuthenticated(true)
          fetchProducts()
        } else {
          setIsAuthenticated(false)
          setLoading(false)
        }
      } catch {
        setIsAuthenticated(false)
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const fetchProducts = async () => {
    try {
      const [productList, settings] = await Promise.all([
        getProducts(),
        getSiteSettings()
      ])
      console.log('Admin - Settings fetched:', settings)
      setProducts(productList)
      if (settings && settings.comingSoonImage) {
        console.log('Admin - Setting hero image:', settings.comingSoonImage)
        setComingSoonImage(settings.comingSoonImage)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      // If it's a Firebase config error, show helpful message
      if (error instanceof Error && error.message.includes('Firebase')) {
        alert('Firebase not configured. Please check your .env.local file and Firebase setup.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
    fetchProducts()
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin-auth', { method: 'DELETE' })
      setIsAuthenticated(false)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleCreateProduct = async (formData: ProductFormData) => {
    try {
      let imageUrls: string[] = []
      
      // Upload images to ImgBB if provided
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
        
        imageUrls = result.imageUrls
      }

      // Create product in Firestore
      const productData = {
        name: formData.name,
        imageUrls,
        price: formData.price,
        category: formData.category,
        description: formData.description,
        affiliateUrl: formData.affiliateUrl,
        featured: formData.featured,
      }

      await createProduct(productData)
      await fetchProducts() // Refresh the list
      
      alert('Product created successfully!')
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Error creating product. Please try again.')
    }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id)
      await fetchProducts() // Refresh the list
      alert('Product deleted successfully!')
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Error deleting product. Please try again.')
    }
  }

  const handleComingSoonImageUpload = async (imageUrl: string) => {
    try {
      console.log('Uploading hero image:', imageUrl)
      await updateComingSoonImage(imageUrl)
      setComingSoonImage(imageUrl)
      console.log('Hero image saved to Firestore')
    } catch (error) {
      console.error('Error updating hero image:', error)
      throw error
    }
  }

  // Show login page if not authenticated
  if (isAuthenticated === false) {
    return <AdminLogin onLogin={handleLogin} />
  }

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show admin panel if authenticated
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading admin panel...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Product Management</h1>
            <p className="text-gray-600 dark:text-gray-300">Add, edit, and manage your product listings</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-1 space-y-8">
            {/* Coming Soon Image Upload */}
            <ComingSoonImageUpload 
              currentImage={comingSoonImage}
              onUpload={handleComingSoonImageUpload}
            />
            
            {/* Add Product Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Add Product</h2>
              <ProductForm onSubmit={handleCreateProduct} />
            </div>
          </div>

          {/* Products Table */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Existing Products</h2>
                {products.length === 0 && !loading && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                    No products loaded. Check Firebase configuration in .env.local
                  </p>
                )}
              </div>
              <ProductTable products={products} onDelete={handleDeleteProduct} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}