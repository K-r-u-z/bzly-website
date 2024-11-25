'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageHero from '@/components/PageHero'
import AlbumForm from '@/components/AlbumForm'
import LoadingSpinner from '@/components/LoadingSpinner'
import type { Album } from '@/types'

export default function EditAlbum({
  params
}: {
  params: { id: string }
}): React.ReactElement {
  const [album, setAlbum] = useState<Album | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    fetchAlbum()
  }, [params.id])

  const fetchAlbum = async () => {
    try {
      const response = await fetch(`/api/music/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch album')
      const data = await response.json()
      setAlbum({
        ...data,
        id: data._id
      })
    } catch (err) {
      setError('Failed to load album')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (data: Partial<Album>) => {
    setIsSaving(true)
    setError('')

    try {
      const response = await fetch(`/api/music/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to update album')

      router.push('/admin/dashboard')
    } catch (err) {
      setError('Failed to update album')
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <LoadingSpinner />

  if (!album) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500">Album not found</h1>
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
        title={`Edit Album: ${album.title}`}
        subtitle="Update album details and tracks"
      />
      
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-center">
              {error}
            </div>
          )}

          <div className="bg-black/50 backdrop-blur-md p-8 rounded-lg border border-sky-900/30">
            <AlbumForm
              initialData={album}
              onSubmit={handleSubmit}
              isLoading={isSaving}
            />
          </div>
        </div>
      </section>
    </main>
  )
} 