import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Curated Products - Products Worth Checking Out',
  description: 'Discover amazing products handpicked for you. From tech to fashion, find what you need.',
  keywords: ['products', 'shopping', 'tech', 'fashion', 'fitness', 'home', 'travel'],
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