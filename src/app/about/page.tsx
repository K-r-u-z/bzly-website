'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import LoadingSpinner from '@/components/LoadingSpinner'

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

export default function About(): React.ReactElement {
  const [aboutData, setAboutData] = useState<AboutData>({
    journey: '',
    image: '',
    milestones: []
  })
  const [isLoading, setIsLoading] = useState(true)

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
      console.error('Failed to fetch about:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-red-500/10 to-black text-white">
      <PageHero 
        title="About"
        subtitle="Our journey in sound"
        titleClassName="text-white"
        subtitleClassName="text-white"
      />
      
      {/* Bio Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-red-500/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              {aboutData.image ? (
                <Image
                  src={aboutData.image}
                  alt="BZLY"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-400">No image uploaded</span>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-100 to-red-200">
                The Journey
              </h2>
              <div className="text-gray-300 space-y-4">
                {aboutData.journey.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-red-100 to-red-200">
              Vision & Mission
            </h2>
            <p className="text-white mb-6">
              Our mission is to create authentic hip-hop that tells real stories,
              connects with people, and pushes creative boundaries while staying
              true to the culture and its roots.
            </p>
            <Link 
              href="/music"
              className="inline-block bg-red-400 hover:bg-red-300 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-100/25"
            >
              Explore Our Music
            </Link>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-100 to-red-200">
            Milestones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutData.milestones.map((milestone, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-red-500/20 rounded-lg backdrop-blur-sm"
              >
                <div className="text-4xl font-bold text-red-100 mb-2">
                  {milestone.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{milestone.label}</h3>
                <p className="text-gray-400">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 