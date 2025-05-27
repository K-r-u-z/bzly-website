'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import LoadingSpinner from '@/components/LoadingSpinner'
import type { NewsItem } from '@/types'
import '@/styles/article.css'

export default function NewsArticle({
  params
}: {
  params: Promise<{ id: string }>
}): React.ReactElement {
  const resolvedParams = React.use(params)
  const [article, setArticle] = useState<NewsItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    fetchArticle()
  }, [resolvedParams.id])

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/news/${resolvedParams.id}`)
      if (!response.ok) throw new Error('Failed to fetch article')
      const data = await response.json()
      
      setArticle({
        ...data,
        id: data._id.toString(),
        _id: data._id.toString(),
        date: new Date(data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      })
    } catch (err) {
      setError('Failed to load article')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <LoadingSpinner />

  if (!article) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-black via-red-500/20 to-black text-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500">Article not found</h1>
            <button
              onClick={() => router.push('/news')}
              className="mt-4 text-red-100 hover:text-red-200"
            >
              Return to News
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-red-500/20 to-black text-white">
      {/* Article Hero */}
      <section className="relative aspect-[16/9] flex items-center justify-center overflow-hidden">
        {/* Background Image with Blur */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10" />
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <span 
            className={`inline-block mb-4 px-4 py-1 rounded-full text-sm ${getCategoryColor(article.category)}`}
          >
            {article.category}
          </span>
          <h1 
            className="text-3xl md:text-5xl font-bold mb-4"
            dangerouslySetInnerHTML={{ __html: article.title }}
          />
          <time className="text-gray-300">
            {article.date}
          </time>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-center">
              {error}
            </div>
          )}

          <div className="article-content">
            <div 
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          <div className="mt-12 pt-8 border-t border-red-500/30">
            <h2 className="text-2xl font-bold mb-4">Share This Article</h2>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
                className="text-red-100 hover:text-red-200 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function getCategoryColor(category: NewsItem['category']): string {
  switch (category) {
    case 'Release':
      return 'bg-red-100 text-white'
    case 'Update':
      return 'bg-red-300 text-white'
    case 'Announcement':
      return 'bg-red-400 text-white'
    case 'Launch':
      return 'bg-red-500 text-white'
    default:
      return 'bg-red-300 text-white'
  }
}
