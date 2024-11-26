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
      }))
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
        _id: album._id.toString()
      }))
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
          {/* Header with Actions */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => router.push('/admin/dashboard/news/create')}
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300"
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
          <div className="bg-black/50 backdrop-blur-md rounded-lg border border-sky-900/30 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sky-900/30">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Category</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-900/30">
                {newsItems.map((item) => (
                  <tr key={item.id.toString()} className="hover:bg-sky-900/10">
                    <td className="px-6 py-4 text-sm text-gray-300">{item.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{item.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${item.category === 'Release' ? 'bg-sky-900/50 text-sky-200' :
                          item.category === 'Tour' ? 'bg-purple-900/50 text-purple-200' :
                          item.category === 'Update' ? 'bg-green-900/50 text-green-200' :
                          'bg-gray-900/50 text-gray-200'
                        }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <button
                        onClick={() => router.push(`/admin/dashboard/news/edit/${item._id}`)}
                        className="text-sky-400 hover:text-sky-300 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id.toString())}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Music Management Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
              Music Management
            </h2>
            
            <div className="bg-black/50 backdrop-blur-md rounded-lg border border-sky-900/30 overflow-hidden">
              <div className="p-6">
                <button
                  onClick={() => router.push('/admin/dashboard/music/create')}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300"
                >
                  Add New Album
                </button>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-sky-900/30">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Album</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Year</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Tracks</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-900/30">
                  {albums?.map((album) => (
                    <tr key={album.id.toString()} className="hover:bg-sky-900/10">
                      <td className="px-6 py-4 text-sm text-gray-300">{album.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{album.year}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{album.tracks.length} tracks</td>
                      <td className="px-6 py-4 text-right text-sm">
                        <button
                          onClick={() => router.push(`/admin/dashboard/music/edit/${album._id}`)}
                          className="text-sky-400 hover:text-sky-300 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAlbum(album.id.toString())}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 