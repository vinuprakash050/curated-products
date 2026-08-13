'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { createProduct } from '@/lib/firestore'
import { seedProducts } from '@/lib/seedData'

export default function SeedPage() {
  const [seeding, setSeeding] = useState(false)
  const [message, setMessage] = useState('')

  const handleSeed = async () => {
    setSeeding(true)
    setMessage('Seeding database...')

    try {
      for (let i = 0; i < seedProducts.length; i++) {
        const product = seedProducts[i]
        await createProduct(product)
        setMessage(`Created ${i + 1}/${seedProducts.length} products...`)
      }
      
      setMessage(`Successfully created ${seedProducts.length} seed products!`)
    } catch (error) {
      console.error('Seeding error:', error)
      setMessage('Error seeding database. Please try again.')
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Seed Database</h1>
          <p className="text-gray-600 mb-6">
            This will add {seedProducts.length} sample products to your database for testing purposes.
          </p>
          
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {seeding ? 'Seeding...' : 'Seed Database'}
          </button>
          
          {message && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="text-gray-700">{message}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}