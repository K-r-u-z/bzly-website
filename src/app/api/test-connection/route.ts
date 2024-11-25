import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import mongoose from 'mongoose'

export async function GET() {
  try {
    await connectDB()
    
    if (!mongoose.connection.db) {
      throw new Error('Database connection not established')
    }

    // Get list of collections
    const collections = await mongoose.connection.db.collections()
    const collectionNames = collections.map(c => c.collectionName)

    return NextResponse.json({
      status: 'success',
      message: 'Connected to MongoDB!',
      database: mongoose.connection.db.databaseName,
      collections: collectionNames,
      connectionState: mongoose.connection.readyState
    })
  } catch (error) {
    console.error('Connection test failed:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Failed to connect to MongoDB',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 