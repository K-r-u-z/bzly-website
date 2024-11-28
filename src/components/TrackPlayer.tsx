'use client'

import React, { useState, useEffect } from 'react'

interface TrackPlayerProps {
  title: string
  duration: string
  trackUrl: string
  onFinish?: () => void
  onPlay?: () => void
  isNext?: boolean
  shouldStop?: boolean
  hasBeenPlayed?: boolean
  isLastTrack?: boolean
}

declare global {
  interface Window {
    SC: {
      Widget: any
    }
  }
}

export default function TrackPlayer({ 
  title, 
  duration, 
  trackUrl,
  onFinish,
  onPlay,
  isNext = false,
  shouldStop = false,
  hasBeenPlayed = false,
  isLastTrack = false
}: TrackPlayerProps): React.ReactElement {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(100)
  const [currentTime, setCurrentTime] = useState(duration)
  const [progress, setProgress] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [lastPosition, setLastPosition] = useState(0)
  const [showProgress, setShowProgress] = useState(false)
  const [widget, setWidget] = useState<any>(null)
  const [isWidgetReady, setIsWidgetReady] = useState(false)
  const iframeId = `sc-widget-${title.replace(/\s+/g, '-').toLowerCase()}`

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://w.soundcloud.com/player/api.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      const iframe = document.getElementById(iframeId) as HTMLIFrameElement
      if (iframe) {
        const newWidget = window.SC.Widget(iframe)
        setWidget(newWidget)

        newWidget.bind(window.SC.Widget.Events.READY, () => {
          setIsWidgetReady(true)
          newWidget.setVolume(100)
          newWidget.getDuration((duration: number) => {
            setTotalDuration(duration)
          })
          if (lastPosition > 0) {
            newWidget.seekTo(lastPosition)
          }
        })

        newWidget.bind(window.SC.Widget.Events.FINISH, () => {
          setIsPlaying(false)
          setCurrentTime(duration)
          setProgress(0)
          setLastPosition(0)
          if (!isLastTrack && onFinish) {
            onFinish()
          }
        })

        newWidget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (data: { currentPosition: number }) => {
          newWidget.getDuration((totalDuration: number) => {
            const remaining = Math.max(0, totalDuration - data.currentPosition)
            const minutes = Math.floor(remaining / 60000)
            const seconds = Math.floor((remaining % 60000) / 1000)
            setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`)
            setProgress((data.currentPosition / totalDuration) * 100)
            setLastPosition(data.currentPosition)
          })
        })
      }
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      setIsWidgetReady(false)
    }
  }, [])

  useEffect(() => {
    if (isNext && widget && isWidgetReady) {
      widget.play()
      setIsPlaying(true)
      setShowProgress(true)
      if (onPlay) onPlay()
    }
  }, [isNext, widget, isWidgetReady])

  useEffect(() => {
    if (shouldStop) {
      widget?.pause()
      setIsPlaying(false)
      setShowProgress(false)
      setProgress(0)
      setLastPosition(0)
    }
  }, [shouldStop, widget])

  const togglePlay = () => {
    if (widget && isWidgetReady) {
      if (isPlaying) {
        widget.pause()
        setIsPlaying(false)
      } else {
        if (lastPosition > 0) {
          widget.seekTo(lastPosition)
        }
        widget.play()
        setIsPlaying(true)
        setShowProgress(true)
        if (onPlay) onPlay()
      }
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    if (widget) {
      widget.setVolume(newVolume)
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseInt(e.target.value)
    const newPosition = (totalDuration * newProgress) / 100
    if (widget) {
      widget.seekTo(newPosition)
      setLastPosition(newPosition)
    }
    setProgress(newProgress)
  }

  return (
    <div 
      className={`space-y-2 py-2 px-4 rounded-lg transition-all duration-300 ${
        isPlaying 
          ? 'bg-sky-900/20 shadow-lg shadow-sky-500/10' 
          : 'hover:bg-white/5'
      }`}
    >
      {/* Track Info Row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isPlaying 
                ? 'bg-sky-500 text-white' 
                : 'bg-sky-500/10 hover:bg-sky-500/20'
            }`}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <span className={`${isPlaying ? 'text-sky-400 font-medium' : ''}`}>
            {title}
          </span>
        </div>

        {/* Volume and Time */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg 
              className={`w-4 h-4 ${isPlaying ? 'text-sky-400' : 'text-gray-400'}`}
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              {volume === 0 ? (
                <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/>
              ) : volume < 50 ? (
                <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
              ) : (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              )}
            </svg>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className={`w-20 h-1 rounded-lg appearance-none cursor-pointer 
                ${isPlaying 
                  ? 'bg-sky-900/50 [&::-webkit-slider-thumb]:bg-sky-400' 
                  : 'bg-gray-900/50 [&::-webkit-slider-thumb]:bg-gray-400'
                }
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:w-3 
                [&::-webkit-slider-thumb]:h-3 
                [&::-webkit-slider-thumb]:rounded-full`}
            />
          </div>
          <span className={`w-16 text-right tabular-nums ${isPlaying ? 'text-sky-400' : 'text-gray-400'}`}>
            {currentTime}
          </span>
        </div>
      </div>

      {/* Progress Slider */}
      {showProgress && (
        <div className="w-full px-2">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 bg-sky-900/50 rounded-lg appearance-none cursor-pointer 
              [&::-webkit-slider-thumb]:appearance-none 
              [&::-webkit-slider-thumb]:w-3 
              [&::-webkit-slider-thumb]:h-3 
              [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:bg-sky-400"
          />
        </div>
      )}

      <iframe
        id={iframeId}
        title={title}
        width="0"
        height="0"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=${trackUrl}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`}
        className="hidden"
      />
    </div>
  )
} 