import React from 'react'
import type { Metadata } from 'next'
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'
import ErrorBoundary from '@/components/ErrorBoundary'
import './globals.css'

// For headings and feature text
const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

// For body text
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://bzly.vercel.app'),
  title: 'BZLY',
  description: 'Official website of BZLY',
  openGraph: {
    title: 'BZLY',
    description: 'Official website of BZLY',
    url: 'https://bzly.vercel.app',
    siteName: 'BZLY',
    images: [
      {
        url: '/og-image.jpg', // Add your OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BZLY',
    description: 'Official website of BZLY',
    images: ['/og-image.jpg'], // Same as OG image
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${jakarta.variable} font-sans`}>
        <ErrorBoundary>
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  )
}
