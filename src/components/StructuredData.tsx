import { Product } from '@/types/product'

interface StructuredDataProps {
  product: Product
}

export default function StructuredData({ product }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.imageUrls,
    description: product.description,
    offers: {
      '@type': 'Offer',
      price: product.price.replace(/[₹,]/g, ''),
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: product.affiliateUrl,
    },
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'buyorbyee',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
