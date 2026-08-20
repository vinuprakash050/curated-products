import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'buyorbyee - Curated Products Worth Checking Out',
  description: 'Discover amazing products handpicked for you. From tech to fashion, find what you need at buyorbyee.',
  keywords: ['buyorbyee', 'products', 'shopping', 'tech', 'fashion', 'fitness', 'home', 'travel', 'curated'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}