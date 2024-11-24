'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import TrackPlayer from '@/components/TrackPlayer'

interface Track {
  title: string
  duration: string
  trackUrl: string
}

interface Album {
  id: number
  title: string
  year: string
  coverArt: string
  streamingLinks: {
    spotify?: string
    apple?: string
    soundcloud?: string
  }
  tracks: Track[]
}

export default function Music(): React.ReactElement {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)
  const [playedTracks, setPlayedTracks] = useState<Set<number>>(new Set())
  const [isExpanded, setIsExpanded] = useState(false)

  const handleTrackFinish = (currentIndex: number) => {
    const nextIndex = currentIndex + 1
    if (nextIndex < albums[0].tracks.length) {
      setCurrentTrackIndex(nextIndex)
      setCurrentlyPlaying(nextIndex)
      setPlayedTracks(prev => new Set(prev).add(nextIndex))
    } else {
      setCurrentlyPlaying(null)
    }
  }

  const handleTrackPlay = (index: number) => {
    setCurrentlyPlaying(index)
    setPlayedTracks(prev => new Set(prev).add(index))
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const shouldRenderTrack = (index: number) => {
    return isExpanded || index < 3
  }

  const albums: Album[] = [
    {
      id: 1,
      title: "The Resurrection",
      year: "2024",
      coverArt: "/album1.png",
      streamingLinks: {
        spotify: "#",
        soundcloud: "https://soundcloud.com/kruzbeats/sets/the-resurrection"
      },
      tracks: [
        { 
          title: "INTRO - Skit",
          duration: "0:48",
          trackUrl: "https://soundcloud.com/kruzbeats/intro-skit?in=kruzbeats/sets/the-resurrection&si=2c994c8221304454bda373c982e01e01&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
        },
        { 
          title: "BIG MOVES",
          duration: "2:17",
          trackUrl: "https://soundcloud.com/kruzbeats/big-moves"
        },
        { 
          title: "THE PICKUP - Skit",
          duration: "0:37",
          trackUrl: "https://soundcloud.com/kruzbeats/the-pickup-skit"
        },
        { 
          title: "DID THE DASH",
          duration: "2:16",
          trackUrl: "https://soundcloud.com/kruzbeats/did-the-dash"
        },
        { 
          title: "RAISED IN THE STRUGGLE",
          duration: "2:31",
          trackUrl: "https://soundcloud.com/kruzbeats/raised-in-the-struggle"
        },
        { 
          title: "GOTTA BE A DAWG",
          duration: "2:13",
          trackUrl: "https://soundcloud.com/kruzbeats/gotta-be-a-dawg"
        },
        { 
          title: "OUTRO - Skit",
          duration: "0:51",
          trackUrl: "https://soundcloud.com/kruzbeats/outro-skit"
        }
      ]
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <PageHero 
        title="Discography"
        subtitle="Explore the sonic universe of BZLY"
      />
      
      {/* Albums Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {albums.map((album) => (
            <div key={album.id} className="mb-20 bg-gradient-to-r from-black to-sky-900/20 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Album Cover */}
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={album.coverArt}
                    alt={album.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Album Info */}
                <div className="md:col-span-2">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
                      {album.title}
                    </h2>
                    <p className="text-gray-400">{album.year}</p>
                  </div>

                  {/* Streaming Links */}
                  <div className="flex gap-4 mb-8">
                    {album.streamingLinks.spotify && (
                      <Link 
                        href={album.streamingLinks.spotify}
                        className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-full transition-colors"
                      >
                        Spotify
                      </Link>
                    )}
                    {album.streamingLinks.apple && (
                      <Link 
                        href={album.streamingLinks.apple}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors"
                      >
                        Apple Music
                      </Link>
                    )}
                    {album.streamingLinks.soundcloud && (
                      <Link 
                        href={album.streamingLinks.soundcloud}
                        target="_blank"
                        className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full transition-colors"
                      >
                        SoundCloud
                      </Link>
                    )}
                  </div>

                  {/* Track List with Players */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold mb-4">Tracks</h3>
                    {album.tracks.map((track, index) => (
                      <div key={index} className={shouldRenderTrack(index) ? 'block' : 'hidden'}>
                        <TrackPlayer
                          title={track.title}
                          duration={track.duration}
                          trackUrl={track.trackUrl}
                          onFinish={() => handleTrackFinish(index)}
                          onPlay={() => handleTrackPlay(index)}
                          isNext={index === currentTrackIndex}
                          shouldStop={currentlyPlaying !== null && currentlyPlaying !== index}
                          hasBeenPlayed={playedTracks.has(index)}
                        />
                      </div>
                    ))}
                    
                    {/* Expand/Collapse Button */}
                    {album.tracks.length > 3 && (
                      <button
                        onClick={toggleExpand}
                        className="mt-4 text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-2"
                      >
                        {isExpanded ? (
                          <>
                            Show Less
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </>
                        ) : (
                          <>
                            Show All {album.tracks.length} Tracks
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Release Call-to-Action - Updated colors */}
      <section className="py-20 px-4 bg-sky-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
            Latest Release
          </h2>
          <p className="text-gray-300 mb-8">
            Experience the latest sounds from BZLY. Available now on all major platforms.
          </p>
          <Link 
            href="#"
            className="inline-block bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-sky-500/25"
          >
            Listen Now
          </Link>
        </div>
      </section>
    </main>
  )
} 