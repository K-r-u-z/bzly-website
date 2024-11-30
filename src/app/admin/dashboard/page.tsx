'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageHero from '@/components/PageHero'
import LoadingSpinner from '@/components/LoadingSpinner'
import type { NewsItem, Album } from '@/types'

export default function AdminDashboard(): React.ReactElement {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    fetchNewsItems()
    fetchAlbums()
  }, [])

  const fetchNewsItems = async () => {
    try {
      const response = await fetch('/api/news')
      if (!response.ok) throw new Error('Failed to fetch news items')
      const data = await response.json()
      const formattedData = data.map((item: any) => ({
        ...item,
        id: item._id.toString(),
        _id: item._id.toString(),
        date: new Date(item.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      })) as NewsItem[]
      setNewsItems(formattedData)
    } catch (err) {
      setError('Failed to load news items')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAlbums = async () => {
    try {
      const response = await fetch('/api/music')
      if (!response.ok) throw new Error('Failed to fetch albums')
      const data = await response.json()
      const formattedData = data.map((album: any) => ({
        ...album,
        id: album._id.toString(),
        _id: album._id.toString(),
        tracks: album.tracks.map((track: any) => ({
          ...track,
          id: track._id.toString(),
          _id: track._id.toString()
        }))
      })) as Album[]
      setAlbums(formattedData)
    } catch (err) {
      setError('Failed to load albums')
      console.error(err)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/admin')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete article')
      }
      
      fetchNewsItems()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete article')
      console.error('Delete error:', err)
    }
  }

  const handleDeleteAlbum = async (id: string) => {
    if (!confirm('Are you sure you want to delete this album?')) return

    try {
      const response = await fetch(`/api/music/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete album')
      }
      
      fetchAlbums()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete album')
      console.error('Delete error:', err)
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <PageHero 
        title="Admin Dashboard"
        subtitle="Manage your content"
      />
      
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Admin Warning */}
          <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg text-yellow-500">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="font-medium">Warning: This page is restricted to administrators only.</span>
            </div>
          </div>

          {/* Email Management Section */}
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
            Email Management
          </h2>
          <div className="mb-12">
            <button
              onClick={() => router.push('/admin/dashboard/email')}
              className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white px-6 py-2 rounded-full transition-all duration-300"
            >
              Send Email Response
            </button>
          </div>

          {/* News Management Section */}
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
            News Management
          </h2>
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => router.push('/admin/dashboard/news/create')}
              className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white px-6 py-2 rounded-full transition-all duration-300"
            >
              Create New Article
            </button>
            
            <button
              onClick={handleLogout}
              className="px-6 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              Logout
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-center">
              {error}
            </div>
          )}

          {/* News Items Table */}
          <div className="bg-black/50 backdrop-blur-md rounded-lg border border-sky-900/30">
            <div className="grid divide-y divide-sky-900/30">
              {newsItems.map((item) => (
                <div key={item.id.toString()} className="p-4 hover:bg-sky-900/10">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-grow">
                      <div className="mb-2">
                        <div 
                          className="text-lg font-medium text-gray-300"
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        <time className="text-sm text-gray-400">{item.date}</time>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${item.category === 'Release' ? 'bg-sky-900/50 text-sky-200' :
                          item.category === 'Tour' ? 'bg-purple-900/50 text-purple-200' :
                          item.category === 'Update' ? 'bg-green-900/50 text-green-200' :
                          'bg-gray-900/50 text-gray-200'
                        }`}>
                        {item.category}
                      </span>
                    </div>
                    <div className="flex gap-4 md:justify-end">
                      <button
                        onClick={() => router.push(`/admin/dashboard/news/edit/${item._id}`)}
                        className="flex items-center gap-2 px-4 py-2 rounded-md bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id.toString())}
                        className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Music Management Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
              Music Management
            </h2>
            <button
              onClick={() => router.push('/admin/dashboard/music/create')}
              className="mb-6 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white px-6 py-2 rounded-full transition-all duration-300"
            >
              Add New Album
            </button>
            
            <div className="bg-black/50 backdrop-blur-md rounded-lg border border-sky-900/30">
              <div className="grid divide-y divide-sky-900/30">
                {albums?.map((album) => (
                  <div key={album.id.toString()} className="p-4 hover:bg-sky-900/10">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-grow">
                        <div className="mb-2">
                          <div className="text-lg font-medium text-gray-300">{album.title}</div>
                          <div className="text-sm text-gray-400">{album.year}</div>
                        </div>
                        <span className="text-sm text-gray-400">
                          {album.tracks.length} tracks
                        </span>
                      </div>
                      <div className="flex gap-4 md:justify-end">
                        <button
                          onClick={() => router.push(`/admin/dashboard/music/edit/${album._id}`)}
                          className="flex items-center gap-2 px-4 py-2 rounded-md bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteAlbum(album.id.toString())}
                          className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 