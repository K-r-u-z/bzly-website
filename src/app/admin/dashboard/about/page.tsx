'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageHero from '@/components/PageHero'
import LoadingSpinner from '@/components/LoadingSpinner'
import ImageUpload from '@/components/ImageUpload'

interface Milestone {
  number: string
  label: string
  description: string
}

interface AboutData {
  journey: string
  image: string
  milestones: Milestone[]
}

export default function EditAbout(): React.ReactElement {
  const [aboutData, setAboutData] = useState<AboutData>({
    journey: '',
    image: '',
    milestones: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    fetchAbout()
  }, [])

  const fetchAbout = async () => {
    try {
      const response = await fetch('/api/about')
      if (!response.ok) throw new Error('Failed to fetch about section')
      const data = await response.json()
      setAboutData(data)
    } catch (err) {
      setError('Failed to load about section')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/about', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aboutData),
      })

      if (!response.ok) throw new Error('Failed to update about section')
      
      router.push('/admin/dashboard')
    } catch (err) {
      setError('Failed to save changes')
      console.error(err)
    }
  }

  const handleJourneyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAboutData(prev => ({
      ...prev,
      journey: e.target.value
    }))
  }

  const handleImageUpload = (url: string) => {
    setAboutData(prev => ({
      ...prev,
      image: url
    }))
  }

  const handleMilestoneChange = (index: number, field: keyof Milestone, value: string) => {
    setAboutData(prev => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) => 
        i === index ? { ...milestone, [field]: value } : milestone
      )
    }))
  }

  const addMilestone = () => {
    setAboutData(prev => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        { number: '', label: '', description: '' }
      ]
    }))
  }

  const removeMilestone = (index: number) => {
    setAboutData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }))
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-red-500/20 to-black">
      <PageHero 
        title="Edit About Section"
        subtitle="Update your journey and milestones"
      />
      
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Journey Text */}
            <div>
              <label htmlFor="journey" className="block text-sm font-medium text-gray-300 mb-2">
                The Journey
              </label>
              <textarea
                id="journey"
                value={aboutData.journey}
                onChange={handleJourneyChange}
                rows={6}
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-red-100 text-white"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                About Image
              </label>
              <ImageUpload
                onImageUpload={handleImageUpload}
                initialImage={aboutData.image}
                aspectRatio={1}
              />
            </div>

            {/* Milestones */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Milestones
                </label>
                <button
                  type="button"
                  onClick={addMilestone}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Add Milestone
                </button>
              </div>
              
              <div className="space-y-4">
                {aboutData.milestones.map((milestone, index) => (
                  <div key={index} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-white font-medium">Milestone {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeMilestone(index)}
                        className="text-gray-400 hover:text-white"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Number
                        </label>
                        <input
                          type="text"
                          value={milestone.number}
                          onChange={(e) => handleMilestoneChange(index, 'number', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-100 text-white"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Label
                        </label>
                        <input
                          type="text"
                          value={milestone.label}
                          onChange={(e) => handleMilestoneChange(index, 'label', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-100 text-white"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Description
                        </label>
                        <input
                          type="text"
                          value={milestone.description}
                          onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-100 text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.push('/admin/dashboard')}
                className="px-6 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
} 