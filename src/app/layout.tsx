import React from 'react'
import type { Metadata } from 'next'
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import dynamic from 'next/dynamic'
import './globals.css'
import { Providers } from './providers'

// Dynamically import client components
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: true })
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true })
const PageTransition = dynamic(() => import('@/components/PageTransition'), { ssr: true })
const ErrorBoundary = dynamic(() => import('@/components/ErrorBoundary'), { ssr: true })
const ClientSmokeEffect = dynamic(() => import('@/components/ClientSmokeEffect'), { ssr: true })
const ClientCustomCursor = dynamic(() => import('@/components/ClientCustomCursor'), { ssr: true })

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

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
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body 
        className={`${outfit.variable} ${jakarta.variable} font-sans`}
        key="main-layout"
      >
        <Providers>
          <ErrorBoundary>
            <ClientCustomCursor />
            <ClientSmokeEffect />
            <Navbar />
            <PageTransition>
              {children}
            </PageTransition>
            <Footer />
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  )
}
