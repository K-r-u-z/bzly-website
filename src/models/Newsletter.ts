import mongoose, { Schema } from 'mongoose'
import type { INewsletter } from '@/types/mongodb'

const NewsletterSchema = new Schema<INewsletter>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  isSubscribed: {
    type: Boolean,
    default: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

export default mongoose.models.Newsletter || mongoose.model<INewsletter>('Newsletter', NewsletterSchema) 