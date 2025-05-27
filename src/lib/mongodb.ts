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
      return cached.conn
    }

    const opts = {
      bufferCommands: true,
      maxPoolSize: 5,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      retryReads: true,
      connectTimeoutMS: 30000,
      heartbeatFrequencyMS: 10000,
      maxIdleTimeMS: 60000,
      waitQueueTimeoutMS: 30000,
      maxConnecting: 3
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return new Promise<typeof mongoose>((resolve, reject) => {
          if (mongoose.connection.readyState === 1) {
            resolve(mongoose)
          } else {
            mongoose.connection.once('connected', () => resolve(mongoose))
            mongoose.connection.once('error', reject)
          }
        })
      })
      .catch((error) => {
        cached.promise = null
        throw error
      })

    try {
      cached.conn = await cached.promise
    } catch (e) {
      cached.promise = null
      throw e
    }

    mongoose.connection.on('error', () => {
      cached.conn = null
      cached.promise = null
    })

    mongoose.connection.on('disconnected', () => {
      cached.conn = null
      cached.promise = null
    })

    return cached.conn
  } catch (error) {
    throw error
  }
}

export default connectDB 