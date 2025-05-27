'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import LoadingSpinner from '@/components/LoadingSpinner'
import type { NewsItem } from '@/types'
import NewsletterForm from '@/components/NewsletterForm'

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
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
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
    <main className="min-h-screen bg-gradient-to-b from-black via-red-500/10 to-black text-white">
      <PageHero 
        title="Latest News"
        subtitle="Stay updated with BZLY"
        titleClassName="text-white"
        subtitleClassName="text-white"
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
            {newsArticles.map((article, index) => (
              <article 
                key={article.id}
                className="bg-gradient-to-r from-black to-red-500/20 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-red-100/10 hover:border-red-100/20 hover:transform hover:scale-[1.02]"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Article Image */}
                  <div className="relative w-full aspect-[16/9]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={index < 2}
                      quality={85}
                      loading={index < 2 ? "eager" : "lazy"}
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
                      <h2 
                        className="text-2xl font-bold mt-2 mb-4 text-white group-hover:text-red-100 transition-colors"
                        dangerouslySetInnerHTML={{ __html: article.title }}
                      />
                      <p className="text-gray-300 mb-6">{article.excerpt}</p>
                    </div>
                    <Link 
                      href={`/news/${article.id}`}
                      className="inline-flex items-center text-red-100 hover:text-red-200 transition-colors"
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
      <section className="py-20 px-4 bg-red-500/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Stay Updated
          </h2>
          <p className="text-gray-300 mb-8">
            Subscribe to our newsletter for exclusive updates and behind-the-scenes content.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </main>
  )
}

function getCategoryColor(category: NewsItem['category']): string {
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
      return 'bg-red-300'
  }
} 