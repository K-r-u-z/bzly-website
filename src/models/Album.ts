import mongoose, { Schema } from 'mongoose'
import type { IAlbum, ITrack, IStreamingLinks } from '@/types/mongodb'

const TrackSchema = new Schema<ITrack>({
  title: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  trackUrl: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

const StreamingLinksSchema = new Schema<IStreamingLinks>({
  spotify: String,
  apple: String,
  soundcloud: String
})

const AlbumSchema = new Schema<IAlbum>({
  title: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  coverArt: {
    type: String,
    required: true
  },
  tracks: [TrackSchema],
  streamingLinks: StreamingLinksSchema
}, {
  timestamps: true
})

export default mongoose.models.Album || mongoose.model<IAlbum>('Album', AlbumSchema) 