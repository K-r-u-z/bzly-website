import mongoose from 'mongoose'

const trackSchema = new mongoose.Schema({
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
}, { timestamps: true })

const albumSchema = new mongoose.Schema({
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
  streamingLinks: {
    spotify: String,
    apple: String,
    soundcloud: String
  },
  tracks: [trackSchema]
}, { timestamps: true })

const Album = mongoose.models.Album || mongoose.model('Album', albumSchema)

export default Album 