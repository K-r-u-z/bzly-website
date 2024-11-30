import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Album from '@/models/Album'
import mongoose from 'mongoose'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const album = await Album.findById(params.id)
    
    if (!album) {
      return NextResponse.json(
        { error: 'Album not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(album)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch album' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const body = await request.json()

    // Clean up track data before updating
    const cleanedTracks = body.tracks?.map((track: any) => ({
      title: track.title,
      duration: track.duration,
      trackUrl: track.trackUrl,
      order: track.order
    })) || []

    const updateData = {
      ...body,
      tracks: cleanedTracks
    }

    const album = await Album.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!album) {
      return NextResponse.json(
        { error: 'Album not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(album)
  } catch (error) {
    console.error('Failed to update album:', error)
    return NextResponse.json(
      { error: 'Failed to update album' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      )
    }

    const album = await Album.findByIdAndDelete(params.id)
    
    if (!album) {
      return NextResponse.json(
        { error: 'Album not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete album' },
      { status: 500 }
    )
  }
} 