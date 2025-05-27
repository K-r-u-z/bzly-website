'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageHero from '@/components/PageHero'
import NewsForm from '@/components/NewsForm'
import LoadingSpinner from '@/components/LoadingSpinner'
import type { NewsItem } from '@/types'
import { use } from 'react'

// Helper function to strip HTML tags
const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, '')
}

export default function EditNews({
  params
}: {
  params: Promise<{ id: string }>
}): React.ReactElement {
  const { id } = use(params)
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    fetchNewsItem()
  }, [id])

  const fetchNewsItem = async () => {
    try {
      const response = await fetch(`/api/news/${id}`)
      if (!response.ok) throw new Error('Failed to fetch news item')
      const data = await response.json()
      
      // Format the date for display
      const displayDate = new Date(data.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      
      // Format the date for the input field (YYYY-MM-DD)
      const date = new Date(data.date)
      const inputDate = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`
      
      setNewsItem({
        ...data,
        id: data._id.toString(),
        _id: data._id.toString(),
        title: stripHtml(data.title || ''),
        content: data.content || '',
        excerpt: stripHtml(data.excerpt || ''),
        image: data.image || '',
        category: data.category || 'Update',
        date: displayDate,
        inputDate: inputDate
      })
    } catch (err) {
      setError('Failed to load news item')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (data: Partial<NewsItem>) => {
    setIsSaving(true)
    setError('')

    if (!newsItem) {
      setError('News item not found')
      setIsSaving(false)
      return
    }

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newsItem,
          ...data,
          date: new Date(data.date || newsItem.date),
          image: data.image || newsItem.image,
          title: data.title || newsItem.title,
          content: data.content || newsItem.content,
          excerpt: data.excerpt || newsItem.excerpt,
          category: data.category || newsItem.category
        }),
      })

      if (!response.ok) throw new Error('Failed to update news item')

      router.push('/admin/dashboard')
    } catch (err) {
      setError('Failed to update news item')
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <LoadingSpinner />

  if (!newsItem) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-black via-black to-black text-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-300">News item not found</h1>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="mt-4 text-gray-400 hover:text-white"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-black to-black text-white">
      <PageHero title={`Edit Article: ${newsItem.title}`} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 text-center">
              {error}
            </div>
          )}

          <div className="bg-black/90 backdrop-blur-md p-8 rounded-lg border border-gray-800">
            <NewsForm
              initialData={newsItem}
              onSubmit={handleSubmit}
              isLoading={isSaving}
            />
          </div>
        </div>
      </div>
    </main>
  )
} 