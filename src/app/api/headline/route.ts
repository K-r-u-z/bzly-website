import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

export async function GET() {
  try {
    const mongoose = await connectDB()
    if (!mongoose.connection.db) {
      throw new Error('Database connection not established')
    }
    
    const headline = await mongoose.connection.db.collection('headlines').findOne({ _id: new ObjectId('000000000000000000000001') })
    
    return NextResponse.json({ headline: headline?.text || 'The Resurrection - OUT NOW!' })
  } catch (error) {
    console.error('Error fetching headline:', error)
    return NextResponse.json(
      { error: 'Failed to fetch headline' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { headline } = await request.json()

    if (!headline) {
      return NextResponse.json(
        { error: 'Headline is required' },
        { status: 400 }
      )
    }

    const mongoose = await connectDB()
    if (!mongoose.connection.db) {
      throw new Error('Database connection not established')
    }
    
    // Update or insert the headline
    await mongoose.connection.db.collection('headlines').updateOne(
      { _id: new ObjectId('000000000000000000000001') },
      { $set: { text: headline } },
      { upsert: true }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating headline:', error)
    return NextResponse.json(
      { error: 'Failed to update headline' },
      { status: 500 }
    )
  }
} 