'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ExternalLink, ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { Product } from '@/types/product'
import MarkdownDescription from '@/components/MarkdownDescription'

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const images = product.imageUrls || []

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const handleCardClick = () => {
    router.push(`/product/${product.id}`)
  }

  const handleAmazonClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleImageNavigation = (e: React.MouseEvent, action: 'next' | 'prev') => {
    e.stopPropagation() // Prevent card click
    if (action === 'next') {
      nextImage()
    } else {
      prevImage()
    }
  }

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    setIsLiked(!isLiked)
  }

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation() // Prevent card click
    setCurrentImageIndex(index)
  }

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null) // Reset
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && images.length > 1) {
      nextImage()
    }
    if (isRightSwipe && images.length > 1) {
      prevImage()
    }
  }

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group cursor-pointer"
    >
      <div 
        className="aspect-square relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.length > 0 ? (
          <>
            <Image
              src={images[currentImageIndex]}
              alt={`${product.name} - ${product.category} product`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              unoptimized
            />
            
            {/* Wishlist Heart */}
            <button
              onClick={handleLikeClick}
              className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <Heart 
                className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} 
              />
            </button>

            {/* Category Badge */}
            <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
              {product.category}
            </div>

            {images.length > 1 && (
              <>
                {/* Navigation Arrows - Hidden on mobile, shown on hover for desktop */}
                <button
                  onClick={(e) => handleImageNavigation(e, 'prev')}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 p-2 rounded-full opacity-0 md:group-hover:opacity-100 transition-opacity z-10 hover:bg-white dark:hover:bg-gray-800"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => handleImageNavigation(e, 'next')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 p-2 rounded-full opacity-0 md:group-hover:opacity-100 transition-opacity z-10 hover:bg-white dark:hover:bg-gray-800"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                
                {/* Dots Indicator - Always visible on mobile */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => handleDotClick(e, index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500 text-sm">No Image</span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 text-lg leading-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {product.name}
        </h3>
        
        {/* Price Section */}
        <div className="flex items-center space-x-1 mb-3">
          <span className="text-lg font-bold text-gray-900 dark:text-white">₹</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {product.price.replace(/[₹]/g, '')}
          </span>
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          <MarkdownDescription 
            content={product.description} 
            isPreview={true}
            className="prose-p:mb-1 prose-p:leading-tight"
          />
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/product/${product.id}`)
            }}
            className="flex-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium py-2 px-4 rounded-lg transition-colors hover:bg-blue-200 dark:hover:bg-blue-900/70"
          >
            View Details
          </button>
          <button
            onClick={handleAmazonClick}
            className="flex-1 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <span>Amazon</span>
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}