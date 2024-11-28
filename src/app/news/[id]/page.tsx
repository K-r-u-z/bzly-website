'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import LoadingSpinner from '@/components/LoadingSpinner'
import type { NewsItem } from '@/types'

export default function NewsArticle({
  params
}: {
  params: { id: string }
}): React.ReactElement {
  const [article, setArticle] = useState<NewsItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    fetchArticle()
  }, [params.id])

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/news/${params.id}`)
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
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500">Article not found</h1>
            <button
              onClick={() => router.push('/news')}
              className="mt-4 text-sky-400 hover:text-sky-300"
            >
              Return to News
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Article Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {article.title}
          </h1>
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

          <div className="prose prose-invert prose-lg max-w-none">
            {/* Split content into paragraphs */}
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-300">
                {paragraph.trim()}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-sky-900/30">
            <button
              onClick={() => router.push('/news')}
              className="text-sky-400 hover:text-sky-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to News
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

function getCategoryColor(category: NewsItem['category']): string {
  switch (category) {
    case 'Release':
      return 'bg-sky-600 text-white'
    case 'Tour':
      return 'bg-blue-600 text-white'
    case 'Update':
      return 'bg-sky-500 text-white'
    case 'Launch':
      return 'bg-green-600 text-white'
    default:
      return 'bg-gray-600 text-white'
  }
}
