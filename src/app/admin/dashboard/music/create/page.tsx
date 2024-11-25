'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageHero from '@/components/PageHero'
import AlbumForm from '@/components/AlbumForm'
import type { Album } from '@/types'

export default function CreateAlbum(): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const handleSubmit = async (data: Partial<Album>) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/music', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to create album')

      router.push('/admin/dashboard')
    } catch (err) {
      setError('Failed to create album')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <PageHero 
        title="Create Album"
        subtitle="Add a new album to your discography"
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
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>
    </main>
  )
} 