'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageHero from '@/components/PageHero'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function HeadlinePage(): React.ReactElement {
  const [headline, setHeadline] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchHeadline()
  }, [])

  const fetchHeadline = async () => {
    try {
      const response = await fetch('/api/headline')
      if (!response.ok) throw new Error('Failed to fetch headline')
      const data = await response.json()
      setHeadline(data.headline)
    } catch (err) {
      setError('Failed to load headline')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')

    try {
      const response = await fetch('/api/headline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ headline }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update headline')
      }

      router.push('/admin/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update headline')
      console.error('Save error:', err)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-black to-black">
      <PageHero 
        title="Change Headline"
        subtitle="Update the main headline on your website"
      />
      
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="headline" className="block text-sm font-medium text-gray-200 mb-2">
                Headline Text
              </label>
              <input
                type="text"
                id="headline"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="Enter headline text"
                required
              />
            </div>

            {error && (
              <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save Headline'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/dashboard')}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
} 