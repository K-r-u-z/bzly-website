'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageHero from '@/components/PageHero'
import AlbumForm from '@/components/AlbumForm'
import LoadingSpinner from '@/components/LoadingSpinner'
import type { Album } from '@/types'
import { use } from 'react'

export default function EditAlbum({
  params
}: {
  params: Promise<{ id: string }>
}): React.ReactElement {
  const { id } = use(params)
  const [album, setAlbum] = useState<Album | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    fetchAlbum()
  }, [id])

  const fetchAlbum = async () => {
    try {
      const response = await fetch(`/api/music/${id}`)
      if (!response.ok) throw new Error('Failed to fetch album')
      const data = await response.json()
      setAlbum({
        ...data,
        id: data._id.toString(),
        _id: data._id.toString(),
        title: data.title || '',
        description: data.description || '',
        coverImage: data.coverImage || '',
        releaseDate: new Date(data.releaseDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        tracks: data.tracks || []
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
      const response = await fetch(`/api/music/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          releaseDate: new Date().toISOString()
        }),
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
      <main className="min-h-screen bg-gradient-to-b from-black via-black to-black text-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-300">Album not found</h1>
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
      <PageHero title={`Edit Album: ${album.title}`} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 text-center">
              {error}
            </div>
          )}

          <div className="bg-black/90 backdrop-blur-md p-8 rounded-lg border border-gray-800">
            <AlbumForm
              initialData={album}
              onSubmit={handleSubmit}
              isLoading={isSaving}
            />
          </div>
        </div>
      </div>
    </main>
  )
} 