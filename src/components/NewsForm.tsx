'use client'

import React, { useState } from 'react'
import type { NewsItem } from '@/types'

interface NewsFormProps {
  initialData?: Partial<NewsItem>
  onSubmit: (data: Partial<NewsItem>) => Promise<void>
  isLoading: boolean
}

export default function NewsForm({ initialData, onSubmit, isLoading }: NewsFormProps) {
  const [formData, setFormData] = useState<Partial<NewsItem>>({
    title: '',
    content: '',
    excerpt: '',
    category: 'Update',
    image: '',
    ...initialData
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
          Title
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
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-2">
          Excerpt
        </label>
        <input
          type="text"
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
        >
          <option value="Release">Release</option>
          <option value="Tour">Tour</option>
          <option value="Update">Update</option>
          <option value="Announcement">Announcement</option>
          <option value="Launch">Launch</option>
        </select>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
          Image URL
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={10}
          className="w-full px-4 py-2 rounded-lg bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400 text-white"
        />
      </div>

      <div className="flex justify-end space-x-4">
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
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
} 