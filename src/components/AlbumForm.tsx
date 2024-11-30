'use client'

import React, { useState, useRef } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Album, Track } from '@/types'

// SortableTrackItem Component
function SortableTrackItem({ track, index, onRemove, onEdit }: { 
  track: Track; 
  index: number;
  onRemove: () => void;
  onEdit: (updatedTrack: Track) => void;
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTrack, setEditedTrack] = useState(track)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: track.id || `track-${index}` })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  const handleSave = () => {
    onEdit(editedTrack)
    setIsEditing(false)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-4 p-4 rounded-lg ${
        isDragging 
          ? 'bg-sky-900/40 ring-2 ring-sky-500/50 shadow-lg scale-105' 
          : 'bg-sky-900/20'
      } transition-all duration-200`}
    >
      {/* Drag Handle - Make it more touch-friendly */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-move text-gray-400 hover:text-sky-400 p-3 -m-1 rounded-lg hover:bg-sky-900/30 active:bg-sky-900/50 touch-none"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        </svg>
      </div>

      {/* Track Order */}
      <span className="text-sm text-gray-500 w-6 text-center">
        {index + 1}
      </span>

      {/* Track Info */}
      {isEditing ? (
        <div className="flex-grow grid grid-cols-3 gap-4">
          <input
            type="text"
            value={editedTrack.title}
            onChange={(e) => setEditedTrack({ ...editedTrack, title: e.target.value })}
            className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-sky-400 text-white"
            placeholder="Track Title"
          />
          <input
            type="text"
            value={editedTrack.duration}
            onChange={(e) => setEditedTrack({ ...editedTrack, duration: e.target.value })}
            className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-sky-400 text-white"
            placeholder="Duration"
          />
          <input
            type="text"
            value={editedTrack.trackUrl}
            onChange={(e) => setEditedTrack({ ...editedTrack, trackUrl: e.target.value })}
            className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-sky-400 text-white"
            placeholder="Track URL"
          />
        </div>
      ) : (
        <div className="flex-grow">
          <div className="font-medium text-gray-300">{track.title}</div>
          <div className="text-sm text-gray-400">{track.duration}</div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        {isEditing ? (
          <button
            type="button"
            onClick={handleSave}
            className="text-green-400 hover:text-green-300 p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-sky-400 hover:text-sky-300 p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          className="text-red-400 hover:text-red-300 p-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}

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

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState(initialData?.coverArt || '')
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file')

  const [newTrack, setNewTrack] = useState<Partial<Track>>({
    title: '',
    duration: '',
    trackUrl: ''
  })

  const [editingTrackIndex, setEditingTrackIndex] = useState<number | null>(null)

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

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setFormData(prev => ({ ...prev, coverArt: url }))
    setImagePreview(url)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setFormData(prev => ({ ...prev, coverArt: base64String }))
        setImagePreview(base64String)
      }
      reader.readAsDataURL(file)
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
      const trackId = `track-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      setFormData(prev => ({
        ...prev,
        tracks: [...(prev.tracks || []), {
          ...newTrack,
          id: trackId,
          _id: trackId,
          order: prev.tracks?.length || 0
        } as Track]
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (over && active.id !== over.id) {
      setFormData(prev => {
        const oldIndex = prev.tracks?.findIndex(t => (t.id || t._id) === active.id)
        const newIndex = prev.tracks?.findIndex(t => (t.id || t._id) === over.id)
        
        if (oldIndex !== undefined && newIndex !== undefined && prev.tracks) {
          return {
            ...prev,
            tracks: arrayMove(prev.tracks, oldIndex, newIndex)
          }
        }
        return prev
      })
    }
  }

  const handleEditTrack = (index: number, updatedTrack: Track) => {
    setFormData(prev => ({
      ...prev,
      tracks: prev.tracks?.map((track, i) => 
        i === index ? { ...track, ...updatedTrack } : track
      )
    }))
  }

  const updateTrack = () => {
    if (editingTrackIndex === null) return addTrack()

    if (newTrack.title && newTrack.duration && newTrack.trackUrl) {
      setFormData(prev => ({
        ...prev,
        tracks: prev.tracks?.map((track, index) => 
          index === editingTrackIndex 
            ? { ...track, ...newTrack }
            : track
        )
      }))
      setNewTrack({
        title: '',
        duration: '',
        trackUrl: ''
      })
      setEditingTrackIndex(null)
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

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
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-sky-400 text-white"
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
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-sky-400 text-white"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300">Cover Art</label>
          
          {/* Toggle Button */}
          <div className="flex justify-center mb-4">
            <button
              type="button"
              onClick={() => setUploadMethod(uploadMethod === 'file' ? 'url' : 'file')}
              className="flex items-center gap-2 px-4 py-2 bg-sky-900/20 text-sky-400 rounded-full hover:bg-sky-900/40 transition-colors"
            >
              {uploadMethod === 'file' ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Switch to URL Input
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Switch to File Upload
                </>
              )}
            </button>
          </div>

          {/* File Upload */}
          {uploadMethod === 'file' && (
            <div className="animate-fadeIn">
              <input
                type="file"
                id="coverArtFile"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-2 bg-sky-900/20 text-sky-400 rounded-lg hover:bg-sky-900/40 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Choose Image File
              </button>
            </div>
          )}

          {/* URL Input */}
          {uploadMethod === 'url' && (
            <div className="animate-fadeIn">
              <label htmlFor="coverArtUrl" className="block text-sm text-gray-400 mb-2">
                Enter Image URL
              </label>
              <input
                type="text"
                id="coverArtUrl"
                name="coverArt"
                value={formData.coverArt}
                onChange={handleImageUrlChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-sky-400 text-white"
                placeholder="Enter image URL"
              />
            </div>
          )}

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4 animate-fadeIn">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preview
              </label>
              <div className="relative w-full max-w-2xl aspect-square">
                <img 
                  src={imagePreview} 
                  alt="Cover Art Preview" 
                  className="w-full h-full object-cover rounded-lg border border-gray-700"
                />
              </div>
            </div>
          )}
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
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-sky-400 text-white"
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
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-sky-400 text-white"
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
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-sky-400 text-white"
          />
        </div>
      </div>

      {/* Tracks */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-sky-400">Tracks</h3>
        
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={formData.tracks?.map((t, i) => t.id || `track-${i}`) || []}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {formData.tracks?.map((track, index) => (
                <SortableTrackItem
                  key={track.id || `track-${index}`}
                  track={track}
                  index={index}
                  onRemove={() => removeTrack(index)}
                  onEdit={(updatedTrack) => handleEditTrack(index, updatedTrack)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Add/Edit Track Form */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            name="title"
            value={newTrack.title}
            onChange={handleTrackChange}
            placeholder="Title"
            className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-sky-400 text-white text-base placeholder:text-gray-500 sm:placeholder:text-sm"
          />
          <input
            type="text"
            name="duration"
            value={newTrack.duration}
            onChange={handleTrackChange}
            placeholder="Time (3:45)"
            className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-sky-400 text-white text-base placeholder:text-gray-500 sm:placeholder:text-sm"
          />
          <input
            type="text"
            name="trackUrl"
            value={newTrack.trackUrl}
            onChange={handleTrackChange}
            placeholder="SoundCloud URL"
            className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-sky-400 text-white text-base placeholder:text-gray-500 sm:placeholder:text-sm"
          />
        </div>
        <button
          type="button"
          onClick={updateTrack}
          className="w-full px-4 py-2 bg-sky-900/20 text-sky-400 rounded-lg hover:bg-sky-900/40 transition-colors"
        >
          {editingTrackIndex !== null ? 'Update Track' : 'Add Track'}
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