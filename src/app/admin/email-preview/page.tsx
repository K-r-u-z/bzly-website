'use client'

import React, { useState } from 'react'
import { generateEmail } from '@/utils/emailTemplates'
import Link from 'next/link'
import PageHero from '@/components/PageHero'

export default function EmailPreviewPage() {
  const [title, setTitle] = useState('This is a test title')
  const [category, setCategory] = useState('UPDATE')
  const [previewHtml, setPreviewHtml] = useState('')
  const [emailType, setEmailType] = useState<'news' | 'welcome'>('news')

  const handlePreview = () => {
    const emailHtml = generateEmail({
      title: emailType === 'welcome' ? 'You are now officially a DAWG!' : title,
      category: emailType === 'welcome' ? 'WELCOME' : category,
      articleId: emailType === 'news' ? 'preview' : undefined,
      email: 'test@example.com'
    })
    setPreviewHtml(emailHtml)
  }

  return (
    <>
      <PageHero 
        title="Email Preview"
        subtitle="Test email templates without sending"
      />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link 
              href="/admin/dashboard"
              className="text-white hover:text-red-300"
            >
              ← Back to Dashboard
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-6 bg-black/50 p-6 rounded-lg border border-red-500/20">
              {/* Email Type Toggle */}
              <div>
                <label className="block text-white mb-2">Email Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setEmailType('news')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      emailType === 'news'
                        ? 'bg-red-400 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    News Email
                  </button>
                  <button
                    onClick={() => setEmailType('welcome')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      emailType === 'welcome'
                        ? 'bg-red-400 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    Welcome Email
                  </button>
                </div>
              </div>

              {/* Show title and category inputs only for news emails */}
              {emailType === 'news' && (
                <>
                  <div>
                    <label className="block text-white mb-2">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-100 focus:outline-none"
                    >
                      <option value="RELEASE">Release</option>
                      <option value="UPDATE">Update</option>
                      <option value="ANNOUNCEMENT">Announcement</option>
                      <option value="LAUNCH">Launch</option>
                    </select>
                  </div>
                </>
              )}

              <button
                onClick={handlePreview}
                className="w-full bg-red-400 hover:bg-red-300 text-white py-2 px-4 rounded-full transition-all duration-300"
              >
                Generate Preview
              </button>
            </div>

            {/* Preview */}
            <div className="bg-black/50 p-6 rounded-lg border border-red-500/20">
              <h2 className="text-xl font-bold text-white mb-4">Preview</h2>
              <div className="bg-white rounded-lg overflow-hidden">
                <iframe
                  srcDoc={previewHtml}
                  className="w-full h-[600px]"
                  title="Email Preview"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
} 