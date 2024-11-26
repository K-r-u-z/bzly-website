'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import TrackPlayer from '@/components/TrackPlayer'
import type { Album } from '@/types'

// Hard-coded default album
const defaultAlbum: Album = {
  id: "1",
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
      trackUrl: "https://soundcloud.com/kruzbeats/intro-skit",
      order: 0
    },
    { 
      title: "BIG MOVES",
      duration: "2:17",
      trackUrl: "https://soundcloud.com/kruzbeats/big-moves",
      order: 1
    },
    { 
      title: "THE PICKUP - Skit",
      duration: "0:37",
      trackUrl: "https://soundcloud.com/kruzbeats/the-pickup-skit",
      order: 2
    },
    { 
      title: "DID THE DASH",
      duration: "2:16",
      trackUrl: "https://soundcloud.com/kruzbeats/did-the-dash",
      order: 3
    },
    { 
      title: "RAISED IN THE STRUGGLE",
      duration: "2:31",
      trackUrl: "https://soundcloud.com/kruzbeats/raised-in-the-struggle",
      order: 4
    },
    { 
      title: "GOTTA BE A DAWG",
      duration: "2:13",
      trackUrl: "https://soundcloud.com/kruzbeats/gotta-be-a-dawg",
      order: 5
    },
    { 
      title: "OUTRO - Skit",
      duration: "0:51",
      trackUrl: "https://soundcloud.com/kruzbeats/outro-skit",
      order: 6
    }
  ]
}

export default function Music(): React.ReactElement {
  const [albums, setAlbums] = useState<Album[]>([defaultAlbum])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [currentlyPlaying, setCurrentlyPlaying] = useState<{ albumIndex: number; trackIndex: number } | null>(null)
  const [playedTracks, setPlayedTracks] = useState<Set<string>>(new Set())
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    fetchAlbums()
  }, [])

  const fetchAlbums = async () => {
    try {
      const response = await fetch('/api/music')
      if (!response.ok) throw new Error('Failed to fetch albums')
      const data = await response.json()
      
      // Format MongoDB data
      const dbAlbums = data.map((album: any) => ({
        ...album,
        id: album._id,
        tracks: album.tracks.sort((a: any, b: any) => a.order - b.order)
      }))

      // Combine default and MongoDB albums, sorted by year (newest first)
      const allAlbums = [...dbAlbums, defaultAlbum].sort((a, b) => 
        parseInt(b.year) - parseInt(a.year)
      )

      setAlbums(allAlbums)
    } catch (err) {
      console.error('Failed to load albums from MongoDB, using default album:', err)
      // Keep using default album on error
    } finally {
      setIsLoading(false)
    }
  }

  const handleTrackPlay = (albumIndex: number, trackIndex: number) => {
    setCurrentlyPlaying({ albumIndex, trackIndex })
    setPlayedTracks(prev => new Set(prev).add(`${albumIndex}-${trackIndex}`))
  }

  const handleTrackFinish = (albumIndex: number, trackIndex: number) => {
    if (trackIndex < albums[albumIndex].tracks.length - 1) {
      setCurrentlyPlaying({ albumIndex, trackIndex: trackIndex + 1 })
    } else {
      setCurrentlyPlaying(null)
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const shouldRenderTrack = (albumIndex: number, trackIndex: number) => {
    if (isExpanded) return true
    return trackIndex < 3 || 
      (currentlyPlaying?.albumIndex === albumIndex && currentlyPlaying?.trackIndex === trackIndex) || 
      playedTracks.has(`${albumIndex}-${trackIndex}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <PageHero 
        title="Music"
        subtitle="Listen to BZLY's latest releases and full discography"
      />
      
      {/* Albums Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-center">
              {error}
            </div>
          )}

          {albums.map((album, albumIndex) => (
            <div key={album.id.toString()} className="mb-20 bg-gradient-to-r from-black to-sky-900/20 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Album Cover */}
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={album.coverArt}
                    alt={album.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
                    {album.tracks.map((track, trackIndex) => (
                      <div 
                        key={trackIndex} 
                        className={shouldRenderTrack(albumIndex, trackIndex) ? 'block' : 'hidden'}
                      >
                        <TrackPlayer
                          title={track.title}
                          duration={track.duration}
                          trackUrl={track.trackUrl}
                          onFinish={() => handleTrackFinish(albumIndex, trackIndex)}
                          onPlay={() => handleTrackPlay(albumIndex, trackIndex)}
                          isNext={currentlyPlaying?.albumIndex === albumIndex && currentlyPlaying?.trackIndex === trackIndex}
                          shouldStop={currentlyPlaying !== null && 
                            (currentlyPlaying.albumIndex !== albumIndex || currentlyPlaying.trackIndex !== trackIndex)}
                          hasBeenPlayed={playedTracks.has(`${albumIndex}-${trackIndex}`)}
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

      {/* Latest Release Call-to-Action */}
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