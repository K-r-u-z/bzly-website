export interface NewsItem {
  id: number
  title: string
  content: string
  date: string
  excerpt: string
  image: string
  category: 'Release' | 'Tour' | 'Update' | 'Announcement' | 'Launch'
}

export interface Track {
  title: string
  duration: string
  trackUrl: string
}

export interface Album {
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