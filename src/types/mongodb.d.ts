import { Document, Types } from 'mongoose'

export interface INews extends Document {
  _id: Types.ObjectId
  title: string
  content: string
  excerpt: string
  date: Date
  image: string
  category: 'Release' | 'Tour' | 'Update' | 'Announcement' | 'Launch'
  createdAt: Date
  updatedAt: Date
}

export interface ITrack {
  _id: Types.ObjectId
  title: string
  duration: string
  trackUrl: string
  order: number
}

export interface IStreamingLinks {
  spotify?: string
  apple?: string
  soundcloud?: string
}

export interface IAlbum extends Document {
  _id: Types.ObjectId
  title: string
  year: string
  coverArt: string
  tracks: ITrack[]
  streamingLinks: IStreamingLinks
  createdAt: Date
  updatedAt: Date
}

export interface IUser extends Document {
  _id: Types.ObjectId
  username: string
  password: string
  role: 'admin'
  createdAt: Date
  updatedAt: Date
}

export interface INewsletter {
  email: string
  isSubscribed: boolean
  subscribedAt: Date
  createdAt: Date
  updatedAt: Date
} 