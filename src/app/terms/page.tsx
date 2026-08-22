import Header from '@/components/Header'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Terms & Conditions | buyorbyee',
  description: 'Terms and conditions for using buyorbyee',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 prose prose-blue dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms & Conditions</h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            <strong>Effective Date:</strong> August 21, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              By accessing and using buyorbyee, you accept and agree to be bound by these Terms and Conditions. 
              If you do not agree with any part of these terms, please do not use our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Affiliate Disclaimer</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              buyorbyee is a participant in the Amazon Associates Program and other affiliate programs. We earn 
              commissions from qualifying purchases made through our affiliate links. This comes at no additional 
              cost to you.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Amazon Disclosure:</strong> "As an Amazon Associate, I earn from qualifying purchases."
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Product Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We strive to provide accurate product information, including descriptions, prices, and availability. 
              However:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Product prices and availability are subject to change without notice</li>
              <li>Actual product specifications may vary from those displayed</li>
              <li>We are not responsible for errors or inaccuracies in product information</li>
              <li>Final product details, pricing, and purchase are handled by the respective merchants</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. No Purchase Obligation</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              buyorbyee is a product recommendation and affiliate marketing website. We do not:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Sell products directly</li>
              <li>Process payments</li>
              <li>Handle shipping or delivery</li>
              <li>Provide customer support for purchased products</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              All purchases are made through third-party merchants (primarily Amazon). Their terms and conditions apply.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. User Responsibilities</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              When using our website, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Use the website for lawful purposes only</li>
              <li>Not attempt to harm or disrupt the website</li>
              <li>Not use automated tools to scrape content</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              All content on buyorbyee, including text, graphics, logos, and images, is the property of buyorbyee 
              or its content suppliers and is protected by copyright laws. Product images may be sourced from 
              merchants and are used for informational purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              buyorbyee is not liable for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Product quality, defects, or damages</li>
              <li>Shipping delays or issues</li>
              <li>Merchant policies or actions</li>
              <li>Inaccurate product information</li>
              <li>Any losses incurred from using our website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. External Links</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our website contains links to external websites (Amazon, other merchants). We are not responsible 
              for the content, privacy practices, or terms of these third-party sites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Changes to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective 
              immediately upon posting. Continued use of the website constitutes acceptance of modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Governing Law</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              These Terms and Conditions are governed by and construed in accordance with the laws of India. 
              Any disputes shall be subject to the exclusive jurisdiction of courts in India.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              For questions about these Terms and Conditions, contact us through:{' '}
              <a 
                href="https://www.instagram.com/buyorbye.ourstore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                @buyorbye.ourstore
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
