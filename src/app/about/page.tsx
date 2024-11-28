'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'

export default function About(): React.ReactElement {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <PageHero 
        title="About"
        subtitle="Our journey in sound"
      />
      
      {/* Bio Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-sky-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/artist-photo.jpg"
                alt="BZLY"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
                The Journey
              </h2>
              <p className="text-gray-300 mb-4">
                BZLY emerged from the vibrant hip-hop underground, bringing fresh perspectives
                and raw energy to the scene. With a distinctive flow and authentic lyrics,
                BZLY crafts stories that resonate with real-life experiences and emotions.
              </p>
              <p className="text-gray-300">
                Each track is a piece of the story, combining hard-hitting beats with
                meaningful lyrics that speak truth to power and connect with listeners
                on a personal level.
              </p>
            </div>
          </div>

          {/* Vision Section */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
              Vision & Mission
            </h2>
            <p className="text-gray-300 mb-6">
              Our mission is to create authentic hip-hop that tells real stories,
              connects with people, and pushes creative boundaries while staying
              true to the culture and its roots.
            </p>
            <Link 
              href="/music"
              className="inline-block bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-sky-500/25"
            >
              Explore Our Music
            </Link>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
            Milestones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                label: "Albums Dropped",
                description: "First tracks released on major platforms"
              },
              {
                number: "100+",
                label: "Monthly Listeners",
                description: "Growing our community organically"
              },
              {
                number: "∞",
                label: "New stories in the works",
                description: "More coming soon!"
              }
            ].map((achievement, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-sky-900/20 rounded-lg backdrop-blur-sm"
              >
                <div className="text-4xl font-bold text-sky-400 mb-2">
                  {achievement.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{achievement.label}</h3>
                <p className="text-gray-400">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 