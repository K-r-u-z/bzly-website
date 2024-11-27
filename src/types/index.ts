import type { INews, IAlbum, ITrack, IStreamingLinks } from './mongodb'

export interface NewsItem {
  id: string
  _id: string
  title: string
  content: string
  excerpt: string
  date: string
  image: string
  category: 'Release' | 'Tour' | 'Update' | 'Announcement' | 'Launch'
  createdAt?: Date
  updatedAt?: Date
}

export interface Album {
  id: string
  _id: string
  title: string
  year: string
  coverArt: string
  tracks: Track[]
  streamingLinks: StreamingLinks
  createdAt?: Date
  updatedAt?: Date
}

export interface Track {
  id: string
  _id: string
  title: string
  duration: string
  trackUrl: string
  order: number
}

export interface StreamingLinks {
  spotify?: string
  apple?: string
  soundcloud?: string
} 