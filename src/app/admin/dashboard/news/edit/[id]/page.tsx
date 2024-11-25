'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageHero from '@/components/PageHero'
import NewsForm from '@/components/NewsForm'
import LoadingSpinner from '@/components/LoadingSpinner'
import type { NewsItem } from '@/types'

export default function EditNews({
  params
}: {
  params: { id: string }
}): React.ReactElement {
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    fetchNewsItem()
  }, [params.id])

  const fetchNewsItem = async () => {
    try {
      const response = await fetch(`/api/news/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch news item')
      const data = await response.json()
      setNewsItem({
        ...data,
        id: data._id,
        date: new Date(data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
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

    try {
      const response = await fetch(`/api/news/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500">News item not found</h1>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="mt-4 text-sky-400 hover:text-sky-300"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <PageHero 
        title={`Edit Article: ${newsItem.title}`}
        subtitle="Update news article details"
      />
      
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-center">
              {error}
            </div>
          )}

          <div className="bg-black/50 backdrop-blur-md p-8 rounded-lg border border-sky-900/30">
            <NewsForm
              initialData={newsItem}
              onSubmit={handleSubmit}
              isLoading={isSaving}
            />
          </div>
        </div>
      </section>
    </main>
  )
} 