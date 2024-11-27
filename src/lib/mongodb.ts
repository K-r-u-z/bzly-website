import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

interface Cached {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: Cached | undefined
}

const cached: Cached = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

async function connectDB() {
  try {
    if (cached.conn) {
      console.log('✅ Using existing MongoDB connection')
      return cached.conn
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4
      }

      cached.promise = mongoose.connect(MONGODB_URI, opts)
        .then((mongoose) => {
          console.log('✅ New MongoDB connection established')
          return mongoose
        })
        .catch((error) => {
          console.error('❌ MongoDB connection error:', error)
          cached.promise = null
          throw error
        })
    }

    try {
      cached.conn = await cached.promise
    } catch (e) {
      cached.promise = null
      console.error('❌ Failed to establish MongoDB connection:', e)
      throw e
    }

    return cached.conn
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    throw error
  }
}

export default connectDB 