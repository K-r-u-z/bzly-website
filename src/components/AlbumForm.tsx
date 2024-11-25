'use client'

import React, { useState } from 'react'
import type { Album, Track } from '@/types'

interface AlbumFormProps {
  initialData?: Partial<Album>
  onSubmit: (data: Partial<Album>) => Promise<void>
  isLoading: boolean
}

export default function AlbumForm({ initialData, onSubmit, isLoading }: AlbumFormProps) {
  const [formData, setFormData] = useState<Partial<Album>>({
    title: '',
    year: new Date().getFullYear().toString(),
    coverArt: '',
    streamingLinks: {
      spotify: '',
      apple: '',
      soundcloud: ''
    },
    tracks: [],
    ...initialData
  })

  const [newTrack, setNewTrack] = useState<Partial<Track>>({
    title: '',
    duration: '',
    trackUrl: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    if (name.startsWith('streaming.')) {
      const platform = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        streamingLinks: {
          ...prev.streamingLinks,
          [platform]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleTrackChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setNewTrack(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addTrack = () => {
    if (newTrack.title && newTrack.duration && newTrack.trackUrl) {
      setFormData(prev => ({
        ...prev,
        tracks: [...(prev.tracks || []), newTrack as Track]
      }))
      setNewTrack({
        title: '',
        duration: '',
        trackUrl: ''
      })
    }
  }

  const removeTrack = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tracks: prev.tracks?.filter((_, i) => i !== index)
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Album Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-sky-400">Album Details</h3>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
            Album Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
          />
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-2">
            Release Year
          </label>
          <input
            type="text"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
          />
        </div>

        <div>
          <label htmlFor="coverArt" className="block text-sm font-medium text-gray-300 mb-2">
            Cover Art URL
          </label>
          <input
            type="text"
            id="coverArt"
            name="coverArt"
            value={formData.coverArt}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
          />
        </div>
      </div>

      {/* Streaming Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-sky-400">Streaming Links</h3>
        
        <div>
          <label htmlFor="streaming.spotify" className="block text-sm font-medium text-gray-300 mb-2">
            Spotify URL
          </label>
          <input
            type="text"
            id="streaming.spotify"
            name="streaming.spotify"
            value={formData.streamingLinks?.spotify}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
          />
        </div>

        <div>
          <label htmlFor="streaming.apple" className="block text-sm font-medium text-gray-300 mb-2">
            Apple Music URL
          </label>
          <input
            type="text"
            id="streaming.apple"
            name="streaming.apple"
            value={formData.streamingLinks?.apple}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
          />
        </div>

        <div>
          <label htmlFor="streaming.soundcloud" className="block text-sm font-medium text-gray-300 mb-2">
            SoundCloud URL
          </label>
          <input
            type="text"
            id="streaming.soundcloud"
            name="streaming.soundcloud"
            value={formData.streamingLinks?.soundcloud}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
          />
        </div>
      </div>

      {/* Tracks */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-sky-400">Tracks</h3>
        
        {/* Track List */}
        <div className="space-y-2">
          {formData.tracks?.map((track, index) => (
            <div key={index} className="flex items-center gap-4 p-2 bg-sky-900/20 rounded-lg">
              <span className="text-gray-300">{track.title}</span>
              <span className="text-gray-400">{track.duration}</span>
              <button
                type="button"
                onClick={() => removeTrack(index)}
                className="ml-auto text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Add New Track */}
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            name="title"
            value={newTrack.title}
            onChange={handleTrackChange}
            placeholder="Track Title"
            className="px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
          />
          <input
            type="text"
            name="duration"
            value={newTrack.duration}
            onChange={handleTrackChange}
            placeholder="Duration (e.g., 3:45)"
            className="px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
          />
          <input
            type="text"
            name="trackUrl"
            value={newTrack.trackUrl}
            onChange={handleTrackChange}
            placeholder="Track URL"
            className="px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
          />
        </div>
        <button
          type="button"
          onClick={addTrack}
          className="w-full px-4 py-2 bg-sky-900/20 text-sky-400 rounded-lg hover:bg-sky-900/40 transition-colors"
        >
          Add Track
        </button>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-sky-600 text-sky-400 rounded-full hover:bg-sky-600 hover:text-white transition-all duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Album'}
        </button>
      </div>
    </form>
  )
} 