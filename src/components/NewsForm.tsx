'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import type { NewsItem } from '@/types'

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
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
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
            className="bg-gray-900 text-white rounded-md"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
            Featured Image URL
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white px-4 py-2 shadow-sm focus:border-sky-500 focus:ring-sky-500"
            placeholder="Enter image URL"
            required
          />
        </div>

        {image && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image Preview
            </label>
            <div className="relative w-full max-w-2xl aspect-video">
              <img 
                src={image} 
                alt="Preview" 
                className="w-full h-full object-cover rounded-lg border border-gray-700"
              />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-2">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white px-4 py-2 shadow-sm focus:border-sky-500 focus:ring-sky-500"
            placeholder="Enter a brief excerpt"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as NewsItem['category'])}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white px-4 py-2 shadow-sm focus:border-sky-500 focus:ring-sky-500"
          >
            <option value="Update">Update</option>
            <option value="Release">Release</option>
            <option value="Tour">Tour</option>
            <option value="Announcement">Announcement</option>
            <option value="Launch">Launch</option>
          </select>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            className="bg-gray-900 text-white rounded-md"
          />
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