'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageHero from '@/components/PageHero'
import NewsForm from '@/components/NewsForm'
import type { NewsItem } from '@/types'

export default function CreateNews(): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const handleSubmit = async (data: Partial<NewsItem>) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }),
      })

      if (!response.ok) throw new Error('Failed to create article')

      router.push('/admin/dashboard')
    } catch (err) {
      setError('Failed to create article')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-black to-black">
      <PageHero 
        title="Create Article"
        subtitle="Add a new article to your news section"
      />
      
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 text-center">
              {error}
            </div>
          )}

          <div className="bg-black/90 backdrop-blur-md p-8 rounded-lg border border-gray-800">
            <NewsForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>
    </main>
  )
} 