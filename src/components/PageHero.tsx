'use client'

import React from 'react'
import Image from 'next/image'
import ParticlesBackground from './ParticlesBackground'

interface PageHeroProps {
  title: string
  subtitle?: string
  height?: 'full' | 'half'
  particlePreset?: 'default' | 'waves' | 'equalizer' | 'pulse' | 'stardust'
  backgroundImage?: string
}

export default function PageHero({ 
  title, 
  subtitle, 
  height = 'half',
  particlePreset = 'default',
  backgroundImage = '/hero-background.jpg'
}: PageHeroProps): React.ReactElement {
  return (
    <section className={`relative ${height === 'full' ? 'h-screen' : 'min-h-[50vh]'} flex items-center justify-center overflow-hidden pt-16`}>
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10" />
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-20">
        <ParticlesBackground preset={particlePreset} />
      </div>
      
      {/* Content */}
      <div className="z-30 text-center px-4 py-20 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-500 leading-[1.4] pb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
} 