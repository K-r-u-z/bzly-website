import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import mongoose from 'mongoose'
import Album from '@/models/Album'
import News from '@/models/News'

export async function GET() {
  try {
    console.log('Testing database connection...')
    await connectDB()
    console.log('Database connected successfully')

    // Test database permissions
    const results = {
      connection: {
        state: mongoose.connection.readyState,
        host: mongoose.connection.host,
        name: mongoose.connection.name,
        port: mongoose.connection.port
      },
      collections: {
        albums: await Album.countDocuments(),
        news: await News.countDocuments()
      },
      permissions: {
        canRead: true,
        canWrite: true
      }
    }

    // Test write permission
    try {
      const testDoc = await Album.create({
        title: 'Test Album',
        year: '2024',
        coverArt: 'test.jpg',
        tracks: []
      })
      await Album.findByIdAndDelete(testDoc._id)
      results.permissions.canWrite = true
    } catch (error) {
      console.error('Write permission test failed:', error)
      results.permissions.canWrite = false
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      connectionState: mongoose.connection.readyState
    }, { 
      status: 500 
    })
  }
} 