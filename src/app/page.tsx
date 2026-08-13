'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { Search, Shield, DollarSign, Truck, Lock, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/product'
import { getProducts, getFeaturedProducts, getSiteSettings } from '@/lib/firestore'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Products')
  const [comingSoonImage, setComingSoonImage] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [allProducts, featured, settings] = await Promise.all([
          getProducts(),
          getFeaturedProducts(),
          getSiteSettings()
        ])
        setProducts(allProducts)
        setFeaturedProducts(featured)
        console.log('Settings fetched:', settings)
        if (settings && settings.comingSoonImage) {
          console.log('Setting hero image:', settings.comingSoonImage)
          setComingSoonImage(settings.comingSoonImage)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)))
    return ['All Products', ...cats.sort()]
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = 
        selectedCategory === 'All Products' || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Products worth{' '}
                <span className="text-blue-600 dark:text-blue-400">checking out.</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                Discover amazing products handpicked for you.{' '}
                <br className="hidden sm:block" />
                From tech to fashion, find what you need.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Images Placeholder */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Circular platform */}
              <div className="w-96 h-96 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full shadow-xl"></div>
                
                {/* Floating elements */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-blue-200 dark:bg-blue-800/50 rounded-full opacity-60 animate-bounce"></div>
                <div className="absolute bottom-12 left-8 w-8 h-8 bg-purple-200 dark:bg-purple-800/50 rounded-full opacity-40"></div>
                <div className="absolute top-1/2 right-0 w-6 h-6 bg-yellow-200 dark:bg-yellow-800/50 rounded-full opacity-50"></div>
                
                {/* Center area for hero image */}
                <div className="absolute inset-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center border dark:border-gray-700 overflow-hidden">
                  {comingSoonImage ? (
                    <div className="relative w-full h-full p-4 flex items-center justify-center">
                      <Image
                        src={comingSoonImage}
                        alt="Featured visual"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="text-gray-400 dark:text-gray-600 text-xs">No image uploaded</div>
                  )}
                </div>
                
                {/* Handpicked Quality Badge */}
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">Handpicked</p>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">Quality Products</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">Trusted, tested &</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">loved by users.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        {featuredProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Products</h2>
              <button className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                <span>View all products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 6).map((product) => (
                <div key={product.id} className="relative">
                  {product.featured && (
                    <div className="absolute -top-2 -left-2 bg-blue-600 dark:bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center space-x-1">
                      <span>★</span>
                      <span>Bestseller</span>
                    </div>
                  )}
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Products Grid */}
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Trust Badges - Compact Footer */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white text-sm">Quality Assured</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Handpicked & tested products</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white text-sm">Best Prices</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Amazing deals & offers</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center flex-shrink-0">
              <Truck className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white text-sm">Fast Delivery</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Quick & reliable shipping</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center flex-shrink-0">
              <Lock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white text-sm">Secure Payments</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">100% secure checkout</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}