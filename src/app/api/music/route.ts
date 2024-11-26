import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Album from '@/models/Album'

export async function GET() {
  try {
    await connectDB()
    const albums = await Album.find().sort({ createdAt: -1 })
    
    // Add cache headers for better performance
    const response = NextResponse.json(albums)
    response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate')
    
    return response
  } catch (error) {
    console.error('Failed to fetch albums:', error)
    return NextResponse.json(
      { error: 'Failed to fetch albums' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()

    // Add order to tracks
    if (body.tracks) {
      body.tracks = body.tracks.map((track: any, index: number) => ({
        ...track,
        order: index
      }))
    }

    const album = await Album.create(body)
    return NextResponse.json(album, { status: 201 })
  } catch (error) {
    console.error('Failed to create album:', error)
    return NextResponse.json(
      { error: 'Failed to create album' },
      { status: 500 }
    )
  }
} 