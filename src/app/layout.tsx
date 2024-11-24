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
  title: 'BZLY - Official Website',
  description: 'Experience the future of sound with BZLY. Listen to the latest releases, including "The Resurrection" album.',
  keywords: 'BZLY, music, electronic music, hip hop, The Resurrection',
  openGraph: {
    title: 'BZLY - Official Website',
    description: 'Experience the future of sound with BZLY',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BZLY - Official Website',
    description: 'Experience the future of sound with BZLY',
    images: ['/og-image.jpg'],
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
