'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { NewsItem } from '@/types'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Highlight from '@tiptap/extension-highlight'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import { FontSize } from '@/extensions/font-size'
import ImageUpload from './ImageUpload'
import '@/styles/editor.css'

interface NewsFormProps {
  initialData?: NewsItem
  onSubmit: (data: Partial<NewsItem>) => Promise<void>
  isLoading: boolean
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault()
    e.stopPropagation()
    action()
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-gray-800 rounded-t-lg border-b border-gray-700">
      {/* Text Style */}
      <div className="flex items-center gap-1 border-r border-gray-700 pr-2">
        <select
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          className="bg-gray-700 text-white rounded px-2 py-1 text-sm"
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
        </select>
        <select
          onChange={(e) => {
            const size = e.target.value
            editor.chain().focus().setFontSize(size).run()
          }}
          className="bg-gray-700 text-white rounded px-2 py-1 text-sm"
        >
          <option value="8px">8px</option>
          <option value="10px">10px</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="32px">32px</option>
        </select>
      </div>

      {/* Text Formatting */}
      <div className="flex items-center gap-1 border-r border-gray-700 pr-2">
        <button
          type="button"
          onClick={(e) => handleButtonClick(e, () => editor.chain().focus().toggleBold().run())}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('bold') ? 'bg-gray-700' : ''}`}
          title="Bold"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h4a2 2 0 002-2V8a2 2 0 00-2-2H6v8zm0 0h8a2 2 0 002-2v-2a2 2 0 00-2-2H6v8z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={(e) => handleButtonClick(e, () => editor.chain().focus().toggleItalic().run())}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('italic') ? 'bg-gray-700' : ''}`}
          title="Italic"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l-4 4-4-4" />
          </svg>
        </button>
        <button
          type="button"
          onClick={(e) => handleButtonClick(e, () => editor.chain().focus().toggleUnderline().run())}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('underline') ? 'bg-gray-700' : ''}`}
          title="Underline"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={(e) => handleButtonClick(e, () => editor.chain().focus().toggleStrike().run())}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('strike') ? 'bg-gray-700' : ''}`}
          title="Strike"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h12M6 12h12" />
          </svg>
        </button>
      </div>

      {/* Text Alignment */}
      <div className="flex items-center gap-1 border-r border-gray-700 pr-2">
        <button
          type="button"
          onClick={(e) => handleButtonClick(e, () => editor.chain().focus().setTextAlign('left').run())}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-700' : ''}`}
          title="Align Left"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h12" />
          </svg>
        </button>
        <button
          type="button"
          onClick={(e) => handleButtonClick(e, () => editor.chain().focus().setTextAlign('center').run())}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-700' : ''}`}
          title="Align Center"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M6 12h12M8 18h8" />
          </svg>
        </button>
        <button
          type="button"
          onClick={(e) => handleButtonClick(e, () => editor.chain().focus().setTextAlign('right').run())}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-700' : ''}`}
          title="Align Right"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M12 18h8" />
          </svg>
        </button>
      </div>

      {/* Lists */}
      <div className="flex items-center gap-1 border-r border-gray-700 pr-2">
        <button
          type="button"
          onClick={(e) => handleButtonClick(e, () => editor.chain().focus().toggleBulletList().run())}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('bulletList') ? 'bg-gray-700' : ''}`}
          title="Bullet List"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button
          type="button"
          onClick={(e) => handleButtonClick(e, () => editor.chain().focus().toggleOrderedList().run())}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('orderedList') ? 'bg-gray-700' : ''}`}
          title="Numbered List"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20h14M7 12h14M7 4h14M3 20h.01M3 12h.01M3 4h.01" />
          </svg>
        </button>
      </div>

      {/* Links and Images */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            const url = window.prompt('Enter the URL')
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('link') ? 'bg-gray-700' : ''}`}
          title="Insert Link"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            const url = window.prompt('Enter the image URL')
            if (url) {
              editor.chain().focus().setImage({ src: url }).run()
            }
          }}
          className="p-2 rounded hover:bg-gray-700"
          title="Insert Image"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function NewsForm({ initialData, onSubmit, isLoading }: NewsFormProps): React.ReactElement {
  const [title, setTitle] = useState(initialData?.title || '')
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '')
  const [image, setImage] = useState(initialData?.image || '')
  const [category, setCategory] = useState<NewsItem['category']>(initialData?.category || 'Update')
  const [date, setDate] = useState(initialData?.inputDate || new Date().toISOString().split('T')[0])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Subscript,
      Superscript,
      Highlight,
      TextStyle,
      Color,
      FontFamily.configure({
        types: ['textStyle'],
      }),
      FontSize,
    ],
    content: initialData?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[200px] p-4 bg-gray-800 rounded-b-lg',
      },
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Create date at noon UTC to prevent timezone issues
      const [year, month, day] = date.split('-').map(Number)
      const utcDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0))

      await onSubmit({
        title,
        content: editor?.getHTML() || '',
        excerpt,
        image,
        category,
        date: utcDate.toISOString()
      })
      router.push('/admin/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save article')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-200">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-200">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white px-4 py-2 shadow-sm focus:border-red-100 focus:ring-red-100 placeholder:text-white/70 text-base"
          placeholder="Brief summary of the article"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium text-gray-200">
          Content
        </label>
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-200">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as NewsItem['category'])}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="Release">Release</option>
            <option value="Update">Update</option>
            <option value="Announcement">Announcement</option>
            <option value="Launch">Launch</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-gray-200">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-200">
          Featured Image
        </label>
        <ImageUpload
          onImageUpload={setImage}
          initialImage={image}
          aspectRatio={16 / 9}
        />
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-red-100 text-red-100 rounded-full hover:bg-red-100 hover:text-white transition-all duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 text-white px-6 py-2 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading || isSubmitting ? 'Saving...' : 'Save Article'}
        </button>
      </div>
    </form>
  )
} 