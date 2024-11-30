'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import TrackPlayer from '@/components/TrackPlayer'
import type { Album } from '@/types'
import Image from 'next/image'

export default function Music(): React.ReactElement {
  const [albums, setAlbums] = useState<Album[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [currentlyPlaying, setCurrentlyPlaying] = useState<{ 
    albumId: string;
    trackIndex: number 
  } | null>(null)
  const [playedTracks, setPlayedTracks] = useState<Set<string>>(new Set())
  const [expandedAlbums, setExpandedAlbums] = useState<Set<string>>(new Set())

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
        id: album._id.toString(),
        _id: album._id.toString(),
        tracks: album.tracks.sort((a: any, b: any) => a.order - b.order).map((track: any) => ({
          ...track,
          id: track._id.toString(),
          _id: track._id.toString()
        }))
      }))

      // Sort albums by year (newest first)
      const sortedAlbums = dbAlbums.sort((a: Album, b: Album) => 
        parseInt(b.year) - parseInt(a.year)
      )

      setAlbums(sortedAlbums)
    } catch (err) {
      console.error('Failed to load albums:', err)
      setError('Failed to load albums')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTrackPlay = (albumId: string, trackIndex: number) => {
    setCurrentlyPlaying({ albumId, trackIndex })
    setPlayedTracks(prev => new Set(prev).add(`${albumId}-${trackIndex}`))
  }

  const handleTrackFinish = (albumId: string, trackIndex: number) => {
    // Only proceed to next track if it's in the same album
    const album = albums.find(a => a.id === albumId)
    if (album && trackIndex < album.tracks.length - 1) {
      setCurrentlyPlaying({ albumId, trackIndex: trackIndex + 1 })
    } else {
      setCurrentlyPlaying(null)
    }
  }

  const toggleExpand = (albumId: string) => {
    setExpandedAlbums(prev => {
      const newSet = new Set(prev)
      if (newSet.has(albumId)) {
        newSet.delete(albumId)
      } else {
        newSet.add(albumId)
      }
      return newSet
    })
  }

  const shouldRenderTrack = (albumId: string, trackIndex: number) => {
    if (expandedAlbums.has(albumId)) return true;
    return trackIndex < 3;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <PageHero 
        title="Music"
        subtitle="Listen to BZLY's latest releases and full discography"
      />
      
      {/* Albums Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-center">
              {error}
            </div>
          )}

          {albums.length === 0 && !isLoading && !error && (
            <div className="text-center text-gray-400">
              No albums available yet.
            </div>
          )}

          {albums.map((album, index) => (
            <div key={album.id.toString()} className="mb-20 bg-gradient-to-r from-black to-sky-900/20 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Album Cover - Fix the width to take full space */}
                <div className="relative w-full">
                  <Image
                    src={album.coverArt}
                    alt={album.title}
                    width={600}
                    height={600}
                    className="w-full rounded-lg shadow-2xl shadow-sky-500/10 hover:scale-105 transition-transform duration-500"
                    priority={index === 0}
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
                        className={shouldRenderTrack(album.id, trackIndex) ? 'block' : 'hidden'}
                      >
                        <TrackPlayer
                          title={track.title}
                          duration={track.duration}
                          trackUrl={track.trackUrl}
                          albumId={album.id}
                          onFinish={() => handleTrackFinish(album.id, trackIndex)}
                          onPlay={() => handleTrackPlay(album.id, trackIndex)}
                          isNext={currentlyPlaying?.albumId === album.id && currentlyPlaying?.trackIndex === trackIndex}
                          shouldStop={currentlyPlaying !== null && 
                            (currentlyPlaying.albumId !== album.id || currentlyPlaying.trackIndex !== trackIndex)}
                          hasBeenPlayed={playedTracks.has(`${album.id}-${trackIndex}`)}
                        />
                      </div>
                    ))}
                    
                    {/* Expand/Collapse Button */}
                    {album.tracks.length > 3 && (
                      <button
                        onClick={() => toggleExpand(album.id)}
                        className="mt-4 text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-2"
                      >
                        {expandedAlbums.has(album.id) ? (
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

      {/* Newsletter Section - Reduce top padding on mobile */}
      <section className="pt-8 md:pt-20 pb-20 px-4 bg-sky-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-sky-400">
            Stay Updated
          </h2>
          <p className="text-gray-300 mb-8">
            Subscribe to our newsletter for exclusive updates and behind-the-scenes content.
          </p>
          <div className="max-w-sm mx-auto">
            <form className="flex flex-col items-center sm:flex-row sm:justify-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-64 px-4 py-2 rounded-full bg-black/50 border border-sky-600 focus:outline-none focus:border-sky-400"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-sky-500/25"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
} 