'use client'

import React, { useState } from 'react'
import TrackPlayer from './TrackPlayer'
import type { Album as AlbumType } from '@/types'

interface AlbumProps {
  album: AlbumType
}

export default function Album({ album }: AlbumProps): React.ReactElement {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1)

  const handleTrackFinish = () => {
    // Move to the next track when current track finishes
    if (currentTrackIndex < album.tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1)
    }
  }

  const handleTrackPlay = (index: number) => {
    // Stop any currently playing track and start the new one
    setCurrentTrackIndex(index)
  }

  return (
    <div className="space-y-4">
      {album.tracks.map((track, index) => (
        <TrackPlayer
          key={track._id}
          title={track.title}
          duration={track.duration}
          trackUrl={track.trackUrl}
          onFinish={handleTrackFinish}
          onPlay={() => handleTrackPlay(index)}
          isNext={currentTrackIndex === index}
          shouldStop={currentTrackIndex !== index && currentTrackIndex !== -1}
          hasBeenPlayed={currentTrackIndex > index}
          isLastTrack={index === album.tracks.length - 1}
        />
      ))}
    </div>
  )
} 