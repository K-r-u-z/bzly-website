import { headers } from 'next/headers'
import connectDB from '@/lib/mongodb'
import Album from '@/models/Album'

export async function GET() {
  try {
    console.log('Connecting to MongoDB...')
    await connectDB()
    console.log('Connected to MongoDB')

    const albums = await Album.find().sort({ year: -1 })
    console.log(`Found ${albums.length} albums`)

    return new Response(JSON.stringify(albums), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, must-revalidate'
      }
    })
  } catch (error) {
    console.error('Error fetching albums:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to fetch albums' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}

export async function POST(request: Request) {
  try {
    console.log('Connecting to MongoDB...')
    await connectDB()
    console.log('Connected to MongoDB')

    const body = await request.json()
    console.log('Received request body:', body)

    // Remove custom track IDs before creating the album
    const tracks = body.tracks.map((track: any) => ({
      title: track.title,
      duration: track.duration,
      trackUrl: track.trackUrl,
      order: track.order
    }))

    const albumData = {
      ...body,
      tracks
    }

    console.log('Creating album with data:', albumData)
    const album = await Album.create(albumData)
    console.log('Album created successfully:', album)

    return new Response(JSON.stringify(album), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, must-revalidate'
      }
    })
  } catch (error) {
    console.error('Error creating album:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to create album',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
} 