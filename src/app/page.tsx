'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { NewsItem } from '@/types'
import ParticlesBackground from '@/components/ParticlesBackground'

export default function Home(): React.ReactElement {
  const newsItems: NewsItem[] = [
    {
      id: "1",
      _id: "1",
      title: "'The Resurrection' Album Release",
      content: "BZLY drops highly anticipated album 'The Resurrection', featuring 7 tracks of raw energy and emotion.",
      date: "November 22, 2024",
      excerpt: "Experience the raw energy of BZLY's latest album.",
      image: "/article1.png",
      category: 'Release'
    },
    {
      id: "2",
      _id: "2",
      title: "New Official Website Launch",
      content: "BZLY launches new interactive website to better connect with fans and showcase our artistic vision.",
      date: "November 23, 2024",
      excerpt: "Explore the new features of BZLY's official website.",
      image: "/article2.png",
      category: 'Launch'
    },
    {
      id: "3",
      _id: "3",
      title: "What's Next for BZLY",
      content: "Exciting developments on the horizon as BZLY teases new projects and collaborations for early 2025.",
      date: "November 24, 2024",
      excerpt: "Discover the upcoming projects and collaborations of BZLY.",
      image: "/article3.png",
      category: 'Announcement'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Blur */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-10" />
          <Image
            src="/hero-background.jpg"
            alt="Background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Particles */}
        <div className="absolute inset-0 z-20">
          <ParticlesBackground />
        </div>
        
        <div className="z-30 text-center px-4">
          {/* BZLY Logo */}
          <div className="relative w-[300px] md:w-[500px] h-[150px] md:h-[250px] mx-auto mb-6 animate-fade-in">
            <Image
              src="/bzly-logo.png"
              alt="BZLY"
              fill
              sizes="(max-width: 768px) 300px, 500px"
              className="object-contain"
              priority
            />
          </div>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            "The Resurrection - OUT NOW!"
          </p>
          <Link 
            href="/music"
            className="inline-block bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-sky-500/25"
          >
            Latest Release
          </Link>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
            Latest News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <div 
                key={item.id}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 border border-sky-500/10 hover:border-sky-500/20 shadow-lg hover:shadow-sky-500/10"
              >
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.content}</p>
                <Link 
                  href="/news"
                  className="text-sky-400 hover:text-blue-400 mt-4 inline-block transition-colors"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Music Section */}
      <section className="py-20 px-4 bg-black/50 backdrop-blur-md relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
            Featured Music
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/album-cover.png"
                alt="Album Cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
                Latest Album
              </h3>
              <p className="text-gray-400 mb-6">
                "The Resurrection"
              </p>
              <div className="flex gap-4">
                <Link 
                  href="/music"
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-sky-500/25"
                >
                  Listen Now
                </Link>
                <Link 
                  href="/music"
                  className="border border-sky-500/50 hover:bg-sky-500/10 px-6 py-2 rounded-full transition-all duration-300"
                >
                  View All
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 