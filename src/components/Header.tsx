'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Moon, Sun, Search, Instagram } from 'lucide-react'

export default function Header() {
  const [isDark, setIsDark] = useState(false)

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = saved === 'dark' || (!saved && prefersDark)
    
    setIsDark(shouldBeDark)
    updateTheme(shouldBeDark)
  }, [])

  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    updateTheme(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo-main.png" 
              alt="buyorbyee Logo" 
              width={64} 
              height={64}
              className="h-14 w-14"
            />
            {/* Light mode logo - hidden on mobile */}
            <Image 
              src="/logomain.png" 
              alt="buyorbyee" 
              width={280} 
              height={88}
              className="hidden md:block dark:hidden"
              style={{ height: '5.5rem',marginTop:'2vh', width: 'auto' }}
              priority
            />
            {/* Dark mode logo - hidden on mobile */}
            <Image 
              src="/logomain-dark.png" 
              alt="buyorbyee" 
              width={280} 
              height={88}
              className="hidden md:dark:block"
              style={{ height: '5.5rem',marginTop:'2vh', width: 'auto' }}
              priority
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-blue-600 dark:text-blue-400 font-medium px-3 py-2 rounded-md text-sm border-b-2 border-blue-600 dark:border-blue-400"
            >
              Products
            </Link>
          </nav>
          
          <div className="flex items-center space-x-3">
            {/* Instagram Link */}
            <a 
              href="https://www.instagram.com/buyorbye.ourstore" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 rounded-full transition-colors"
              aria-label="Visit our Instagram for product reviews"
              title="Product Reviews on Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            
            {/* Search Icon for Mobile */}
            <button className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <Search className="h-5 w-5" />
            </button>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-full transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}