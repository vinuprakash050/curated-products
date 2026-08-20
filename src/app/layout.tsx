import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://buyorbyeee.vercel.app'),
  title: {
    default: 'buyorbyee - Curated Products Worth Checking Out',
    template: '%s | buyorbyee'
  },
  description: 'Discover amazing products handpicked for you. From tech to fashion, find what you need at buyorbyee. Trusted, tested, and loved by users.',
  keywords: ['buyorbyee', 'products', 'shopping', 'online shopping', 'tech', 'fashion', 'fitness', 'home', 'travel', 'curated products', 'amazon affiliate', 'product reviews', 'best products', 'handpicked products'],
  authors: [{ name: 'buyorbyee' }],
  creator: 'buyorbyee',
  publisher: 'buyorbyee',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buyorbyeee.vercel.app',
    title: 'buyorbyee - Curated Products Worth Checking Out',
    description: 'Discover amazing products handpicked for you. From tech to fashion, find what you need at buyorbyee.',
    siteName: 'buyorbyee',
    images: [
      {
        url: '/logo-main.png',
        width: 1200,
        height: 630,
        alt: 'buyorbyee - Curated Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'buyorbyee - Curated Products Worth Checking Out',
    description: 'Discover amazing products handpicked for you. From tech to fashion, find what you need.',
    images: ['/logo-main.png'],
    creator: '@buyorbye',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these after setting up in Google Search Console and Bing Webmaster Tools
    // google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: 'https://buyorbyeee.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://buyorbyeee.vercel.app" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}