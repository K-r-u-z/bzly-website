'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import LoadingSpinner from '@/components/LoadingSpinner'
import type { NewsItem } from '@/types'

export default function News(): React.ReactElement {
  const [newsArticles, setNewsArticles] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news')
      if (!response.ok) throw new Error('Failed to fetch news')
      const data = await response.json()
      
      // Format MongoDB data
      const formattedArticles = data.map((item: any) => ({
        ...item,
        id: item._id.toString(),
        _id: item._id.toString(),
        date: new Date(item.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt)
      }))

      // Sort by date in descending order (newest first)
      const sortedArticles = formattedArticles.sort((a: NewsItem, b: NewsItem) => {
        const dateA = a.createdAt ? a.createdAt : new Date(a.date)
        const dateB = b.createdAt ? b.createdAt : new Date(b.date)
        return dateB.getTime() - dateA.getTime()
      })

      setNewsArticles(sortedArticles)
    } catch (err) {
      console.error('Failed to load news:', err)
      setError('Failed to load news articles')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <PageHero 
        title="Latest News"
        subtitle="Stay updated with BZLY"
      />
      
      {/* News Articles */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-center">
              {error}
            </div>
          )}

          <div className={`grid grid-cols-1 gap-12 ${newsArticles.length === 1 ? 'max-w-3xl mx-auto' : ''}`}>
            {newsArticles.map((article) => (
              <article 
                key={article.id}
                className="bg-gradient-to-r from-black to-sky-900/20 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Article Image */}
                  <div className="relative h-[300px] md:h-auto">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <span 
                      className={`absolute top-4 left-4 ${getCategoryColor(article.category)} px-4 py-1 rounded-full text-sm`}
                    >
                      {article.category}
                    </span>
                  </div>

                  {/* Article Content */}
                  <div className="p-8">
                    <div className="mb-4">
                      <time className="text-gray-400 text-sm">{article.date}</time>
                      <h2 className="text-2xl font-bold mt-2 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
                        {article.title}
                      </h2>
                      <p className="text-gray-300 mb-6">{article.excerpt}</p>
                    </div>
                    <Link 
                      href={`/news/${article.id}`}
                      className="inline-flex items-center text-sky-400 hover:text-blue-400 transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-sky-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
            Stay Updated
          </h2>
          <p className="text-gray-300 mb-8">
            Subscribe to our newsletter for exclusive updates and behind-the-scenes content.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-sky-500/25"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

function getCategoryColor(category: NewsItem['category']): string {
  switch (category) {
    case 'Release':
      return 'bg-sky-600'
    case 'Tour':
      return 'bg-blue-600'
    case 'Update':
      return 'bg-sky-500'
    case 'Launch':
      return 'bg-green-600'
    default:
      return 'bg-gray-600'
  }
} 