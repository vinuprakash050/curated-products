'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react'
import Header from '@/components/Header'
import MarkdownDescription from '@/components/MarkdownDescription'
import { Product } from '@/types/product'
import { getProducts } from '@/lib/firestore'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts()
        const foundProduct = products.find(p => p.id === params.id)
        
        if (foundProduct) {
          setProduct(foundProduct)
        } else {
          router.push('/')
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id, router])

  const handleAmazonClick = () => {
    if (product?.affiliateUrl) {
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Share failed:', error)
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Product link copied to clipboard!')
    }
  }

  const nextImage = () => {
    if (product?.imageUrls) {
      setCurrentImageIndex((prev) => (prev + 1) % product.imageUrls.length)
    }
  }

  const prevImage = () => {
    if (product?.imageUrls) {
      setCurrentImageIndex((prev) => (prev - 1 + product.imageUrls.length) % product.imageUrls.length)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading product...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h1>
            <Link 
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              ← Back to products
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const images = product.imageUrls || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg group">
              {images.length > 0 ? (
                <>
                  <Image
                    src={images[currentImageIndex]}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                  
                  {/* Image Navigation */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-white dark:hover:bg-gray-800"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-white dark:hover:bg-gray-800"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                    {product.category}
                  </div>

                  {/* Featured Badge */}
                  {product.featured && (
                    <div className="absolute top-4 right-4 bg-blue-600 dark:bg-blue-500 text-white text-sm font-bold px-3 py-2 rounded-full flex items-center space-x-1">
                      <span>★</span>
                      <span>Featured</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                  <span className="text-gray-400 dark:text-gray-500">No Image Available</span>
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex
                        ? 'border-blue-600 dark:border-blue-400'
                        : 'border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-1 text-4xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="text-3xl">₹</span>
                <span>{product.price.replace(/[₹]/g, '')}</span>
              </div>

              <div className="mb-6">
                <MarkdownDescription content={product.description} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAmazonClick}
                className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-3 text-lg"
              >
                <span>View on Amazon</span>
                <ExternalLink className="h-5 w-5" />
              </button>

              <div className="flex space-x-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex-1 border-2 rounded-xl py-3 px-4 font-medium transition-colors flex items-center justify-center space-x-2 ${
                    isLiked
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{isLiked ? 'Liked' : 'Like'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl py-3 px-4 font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Product Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Category:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {product.featured ? 'Featured Product' : 'Regular Product'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Images:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {images.length} {images.length === 1 ? 'Image' : 'Images'}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
              <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Why We Recommend This</h4>
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                This product has been carefully selected and reviewed by our team. We believe it offers great value and quality for its category.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}