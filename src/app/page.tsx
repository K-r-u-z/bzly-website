'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { NewsItem, Album } from '@/types'
import ParticlesBackground from '@/components/ParticlesBackground'

export default function Home(): React.ReactElement {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [latestAlbum, setLatestAlbum] = useState<Album | null>(null)
  const [headline, setHeadline] = useState('...')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    fetchNewsItems()
    fetchLatestAlbum()
    fetchHeadline()
  }, [])

  const fetchNewsItems = async () => {
    try {
      const response = await fetch('/api/news')
      if (!response.ok) throw new Error('Failed to fetch news')
      const data = await response.json()
      
      // Format and sort the news items
      const formattedNews = data
        .map((item: any) => ({
          ...item,
          id: item._id.toString(),
          _id: item._id.toString(),
          date: new Date(item.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }))
        .sort((a: NewsItem, b: NewsItem) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )

      setNewsItems(formattedNews)
    } catch (error) {
      console.error('Failed to fetch news:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchLatestAlbum = async () => {
    try {
      const response = await fetch('/api/music')
      if (!response.ok) throw new Error('Failed to fetch albums')
      const data = await response.json()
      
      // Format and sort albums by year and creation date (newest first)
      const albums = data.map((album: any) => ({
        ...album,
        id: album._id.toString(),
        _id: album._id.toString(),
        createdAt: new Date(album.createdAt || new Date())
      })).sort((a: any, b: any) => {
        // First sort by year
        const yearComparison = parseInt(b.year) - parseInt(a.year)
        if (yearComparison !== 0) return yearComparison
        
        // If years are the same, sort by creation date
        return b.createdAt.getTime() - a.createdAt.getTime()
      })

      // Set the latest album (first in the sorted array)
      if (albums.length > 0) {
        setLatestAlbum(albums[0])
      }
    } catch (err) {
      console.error('Failed to load latest album:', err)
    }
  }

  const fetchHeadline = async () => {
    try {
      const response = await fetch('/api/headline')
      if (!response.ok) throw new Error('Failed to fetch headline')
      const data = await response.json()
      setHeadline(data.headline)
    } catch (err) {
      console.error('Failed to fetch headline:', err)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-red-500/10 to-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Blur */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-10" />
          <Image
            src="/hero-background.jpg"
            alt="Background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>

        {/* Particles */}
        <div className="absolute inset-0 z-20">
          <ParticlesBackground />
        </div>
        
        <div className="z-30 text-center px-4">
          {/* BZLY Logo */}
          <div className="relative w-[300px] md:w-[500px] h-[150px] md:h-[250px] mx-auto mb-6 animate-fade-in">
            <Image
              src="/bzly-logo.png"
              alt="BZLY"
              fill
              sizes="(max-width: 768px) 300px, 500px"
              className="object-contain"
              priority
              quality={100}
            />
          </div>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            {headline}
          </p>
          <Link 
            href="/music"
            className="inline-block bg-red-400 hover:bg-red-300 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-100/25"
          >
            Latest Release
          </Link>
        </div>
      </section>

      {/* News Section */}
      <section className="py-12 md:py-32 px-4 bg-gradient-to-b from-black to-red-500/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-24">
            <h2 className="inline-block text-3xl md:text-4xl font-bold mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-red-100 to-red-200 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-48 after:h-1 after:bg-gradient-to-r after:from-red-100 after:to-red-200 after:rounded-full pb-4">
              Latest News
            </h2>
          </div>
          <div className={`grid grid-cols-1 gap-8 ${
            newsItems.length === 1 
              ? 'max-w-xl mx-auto' 
              : newsItems.length === 2 
                ? 'md:grid-cols-2 max-w-3xl mx-auto'
                : newsItems.length === 3
                  ? 'md:grid-cols-3 max-w-6xl mx-auto'
                  : 'md:grid-cols-2 max-w-6xl mx-auto'
          }`}>
            {isLoading ? (
              <div className="col-span-full text-center">
                <p className="text-gray-400">Loading news...</p>
              </div>
            ) : newsItems.length > 0 ? (
              newsItems.slice(0, 4).map((item, index) => (
                <div 
                  key={item.id}
                  className="bg-black/50 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-red-100/10 hover:border-red-100/20 shadow-lg hover:shadow-red-100/10 flex flex-col"
                >
                  {/* Article Image */}
                  <div className="relative w-full aspect-[16/9]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      quality={85}
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                    <span 
                      className={`absolute top-4 left-4 ${getCategoryColor(item.category)} px-4 py-1 rounded-full text-sm`}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 
                      className="text-xl font-bold mb-4 text-white"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <div 
                      className="text-gray-300 line-clamp-3 mb-4 prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: item.excerpt }}
                    />
                    <Link 
                      href={`/news/${item.id}`}
                      className="text-red-100 hover:text-red-200 mt-auto inline-block transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center">
                <p className="text-gray-400">No news articles available</p>
              </div>
            )}
          </div>
          
          {/* View All News Button */}
          <div className="text-center mt-12">
            <Link 
              href="/news"
              className="inline-block bg-red-400 hover:bg-red-300 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-100/25"
            >
              View All News
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Music */}
      <section className="py-12 md:py-32 px-4 bg-gradient-to-b from-black to-red-500/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-24">
            <h2 className="inline-block text-3xl md:text-4xl font-bold mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-red-100 to-red-200 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-48 after:h-1 after:bg-gradient-to-r after:from-red-100 after:to-red-200 after:rounded-full pb-4">
              Featured Music
            </h2>
          </div>
          
          {latestAlbum ? (
            <div className="flex flex-col md:flex-row gap-12">
              {/* Album Cover */}
              <div className="w-full md:w-1/2">
                <Image
                  src={latestAlbum.coverArt}
                  alt={latestAlbum.title}
                  width={600}
                  height={600}
                  className="w-full rounded-lg shadow-2xl shadow-red-100/10 hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Album Info */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h3 className="text-lg font-medium text-red-100 mb-2">Latest Album</h3>
                <h4 className="text-2xl font-bold mb-2 text-gray-200">
                  {latestAlbum.title} - {latestAlbum.year}
                </h4>
                <div className="flex gap-4 mt-4">
                  <Link 
                    href="/music"
                    className="bg-red-400 hover:bg-red-300 text-white px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-100/25"
                  >
                    Listen Now
                  </Link>
                  <Link 
                    href="/music"
                    className="border border-red-100 text-red-100 hover:bg-red-100/10 px-6 py-2 rounded-full transition-colors"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              No albums available
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'Release':
      return 'bg-red-100'
    case 'Update':
      return 'bg-red-300'
    case 'Announcement':
      return 'bg-red-400'
    case 'Launch':
      return 'bg-red-500'
    default:
      return 'bg-red-500/80'
  }
} 