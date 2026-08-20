import { MetadataRoute } from 'next'
import { getProducts } from '@/lib/firestore'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://buyorbyeee.vercel.app'
  
  try {
    // Fetch all products for dynamic URLs
    const products = await getProducts()
    
    const productUrls = products.map((product) => ({
      url: `${baseUrl}/product/${product.id}`,
      lastModified: product.createdAt instanceof Date 
        ? product.createdAt 
        : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      ...productUrls,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return at least the homepage if product fetch fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ]
  }
}
