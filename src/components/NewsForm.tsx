'use client'

import React, { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import type { NewsItem } from '@/types'
import './quill-custom.css'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
})
import 'react-quill/dist/quill.snow.css'

interface NewsFormProps {
  initialData?: NewsItem
  onSubmit: (data: Partial<NewsItem>) => Promise<void>
  isLoading: boolean
}

export default function NewsForm({ initialData, onSubmit, isLoading }: NewsFormProps): React.ReactElement {
  const [title, setTitle] = useState(initialData?.title || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '')
  const [image, setImage] = useState(initialData?.image || '')
  const [category, setCategory] = useState<NewsItem['category']>(initialData?.category || 'Update')
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState(initialData?.image || '')

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setImage(url)
    setImagePreview(url)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setImage(base64String)
        setImagePreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({
      title,
      content,
      excerpt,
      image,
      category,
      date: new Date().toISOString()
    })
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'align',
    'list', 'bullet',
    'link', 'image'
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
            Title
          </label>
          <ReactQuill
            theme="snow"
            value={title}
            onChange={setTitle}
            modules={{
              toolbar: [
                ['bold', 'italic'],
                [{ 'color': [] }],
                [{ 'align': [] }],
              ]
            }}
            formats={['bold', 'italic', 'color', 'align']}
            className="bg-gray-900 text-white rounded-md quill-white"
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-white mb-2">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white px-4 py-2 shadow-sm focus:border-sky-500 focus:ring-sky-500 placeholder:text-white/70 text-base"
            placeholder="Brief summary of the article"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-white mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as NewsItem['category'])}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white px-4 py-2 shadow-sm focus:border-sky-500 focus:ring-sky-500 text-base"
          >
            <option value="Update">Update</option>
            <option value="Release">Release</option>
            <option value="Tour">Tour</option>
            <option value="Announcement">Announcement</option>
            <option value="Launch">Launch</option>
          </select>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-white mb-2">
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            className="bg-gray-900 text-white rounded-md quill-white"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-white">Featured Image</label>
          
          {/* Toggle Button */}
          <div className="flex justify-center mb-4">
            <button
              type="button"
              onClick={() => setUploadMethod(uploadMethod === 'file' ? 'url' : 'file')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-sky-400 rounded-full hover:bg-sky-900/40 transition-colors border border-gray-700"
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
                id="imageFile"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-2 bg-gray-900 text-sky-400 rounded-lg hover:bg-sky-900/40 transition-colors border border-gray-700 flex items-center justify-center gap-2"
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
              <label htmlFor="imageUrl" className="block text-sm text-white mb-2">
                Enter Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                value={image}
                onChange={handleImageUrlChange}
                className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white placeholder:text-white/70 text-base"
                placeholder="Image URL"
              />
            </div>
          )}

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4 animate-fadeIn">
              <label className="block text-sm font-medium text-white mb-2">
                Preview
              </label>
              <div className="relative w-full max-w-2xl aspect-video">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover rounded-lg border border-gray-700"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-700">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Article'}
        </button>
      </div>
    </form>
  )
} 