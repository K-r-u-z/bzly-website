'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import PageHero from '@/components/PageHero'
import LoadingSpinner from '@/components/LoadingSpinner'
import type { NewsItem, Album } from '@/types'
import Link from 'next/link'

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
      await signOut({ redirect: false })
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

  const handleSendResponse = () => {
    // For now, just navigate to email preview
    router.push('/admin/email-preview')
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-red-500/20 to-black">
      <PageHero 
        title="Admin Dashboard"
        subtitle="Manage your content"
      />
      
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Admin Warning */}
          <div className="mb-8 p-4 bg-black/50 border border-gray-700 rounded-lg text-gray-300">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="font-medium">Warning: This page is restricted to administrators only.</span>
            </div>
          </div>

          {/* Management Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
            {/* Admin Menu Card */}
            <div className="md:col-span-2 bg-gradient-to-br from-black/90 to-black/95 rounded-xl p-4 border border-red-400 hover:border-red-300 transition-all duration-300">
              <div className="flex flex-col h-full">
                <div className="space-y-3">
                  <Link 
                    href="/admin/email-preview"
                    className="flex items-center gap-2 p-3 bg-red-400 hover:bg-red-300 text-white rounded-lg transition-all duration-300 w-full h-12"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Send Email</span>
                  </Link>
                  <Link
                    href="/admin/dashboard/headline"
                    className="flex items-center gap-2 p-3 bg-red-400 hover:bg-red-300 text-white rounded-lg transition-all duration-300 w-full h-12"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                    <span>Edit Headline</span>
                  </Link>
                  <Link
                    href="/admin/dashboard/about"
                    className="flex items-center gap-2 p-3 bg-red-400 hover:bg-red-300 text-white rounded-lg transition-all duration-300 w-full h-12"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Edit About Me</span>
                  </Link>
                </div>
                <div className="mt-auto pt-3">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-3 bg-red-400/50 hover:bg-red-300/50 text-white rounded-lg transition-all duration-300 w-full h-12"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Music Management Card */}
            <div className="md:col-span-5 bg-gradient-to-br from-black/90 to-black/95 rounded-xl p-6 border border-red-400 hover:border-red-300 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-400/50 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Music Management</h2>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => router.push('/admin/dashboard/music/create')}
                  className="w-full flex items-center gap-2 p-3 bg-red-400 hover:bg-red-300 text-white rounded-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add New Album</span>
                </button>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {albums.map((album) => (
                    <div key={album.id} className="flex items-center gap-4 p-3 bg-red-400/50 rounded-lg hover:bg-red-300/50 transition-all duration-300">
                      <div className="flex-grow">
                        <h3 className="text-white font-medium">{album.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-white/80 text-sm">{album.year}</p>
                          <span className="text-white/80 text-sm">
                            {album.tracks.length} tracks
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => router.push(`/admin/dashboard/music/edit/${album._id}`)}
                          className="p-2 text-white/80 hover:text-white transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteAlbum(album.id.toString())}
                          className="p-2 text-white/80 hover:text-white transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* News Management Card */}
            <div className="md:col-span-5 bg-gradient-to-br from-black/90 to-black/95 rounded-xl p-6 border border-red-400 hover:border-red-300 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-400/50 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">News Management</h2>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => router.push('/admin/dashboard/news/create')}
                  className="w-full flex items-center gap-2 p-3 bg-red-400 hover:bg-red-300 text-white rounded-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create New Article</span>
                </button>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {newsItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 bg-red-400/50 rounded-lg hover:bg-red-300/50 transition-all duration-300">
                      <div className="flex-grow min-w-0">
                        <h3 className="text-white font-medium truncate" dangerouslySetInnerHTML={{ __html: item.title }} />
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-white/80 text-sm">{item.date}</p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium
                            ${item.category === 'Release' ? 'bg-red-400/50 text-white' :
                              item.category === 'Update' ? 'bg-red-400/50 text-white' :
                              item.category === 'Announcement' ? 'bg-red-400/50 text-white' :
                              item.category === 'Launch' ? 'bg-red-400/50 text-white' :
                              'bg-red-400/50 text-white'
                            }`}>
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => router.push(`/admin/dashboard/news/edit/${item._id}`)}
                          className="p-2 text-white/80 hover:text-white transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id.toString())}
                          className="p-2 text-white/80 hover:text-white transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-black/50 border border-red-400/50 rounded-lg text-gray-300">
              {error}
            </div>
          )}
        </div>
      </section>
    </main>
  )
} 