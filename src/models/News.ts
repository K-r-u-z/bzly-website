import mongoose, { Schema } from 'mongoose'
import type { INews } from '@/types/mongodb'

const NewsSchema = new Schema<INews>({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Release', 'Tour', 'Update', 'Announcement', 'Launch'],
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.models.News || mongoose.model<INews>('News', NewsSchema) 