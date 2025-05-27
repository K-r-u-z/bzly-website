import type { INews, IAlbum, ITrack, IStreamingLinks } from './mongodb'

export type NewsItem = {
  id: string
  _id: string
  title: string
  content: string
  excerpt: string
  image: string
  category: 'Release' | 'Update' | 'Announcement' | 'Launch'
  date: string
  inputDate?: string
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
  soundcloud?: string
} 