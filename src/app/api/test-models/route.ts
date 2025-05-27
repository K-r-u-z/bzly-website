import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Album from '@/models/Album'
import News from '@/models/News'

export async function GET() {
  try {
    await connectDB()
    
    // Test creating a news article
    const testNews = await News.create({
      title: 'Test Article',
      content: 'Test Content',
      excerpt: 'Test Excerpt',
      date: new Date(),
      image: '/test-image.jpg',
      category: 'Update'
    })

    // Test creating an album
    const testAlbum = await Album.create({
      title: 'Test Album',
      year: '2024',
      coverArt: '/test-cover.jpg',
      tracks: [{
        title: 'Test Track',
        duration: '3:30',
        trackUrl: 'https://example.com/track',
        order: 1
      }],
      streamingLinks: {
        soundcloud: 'https://soundcloud.com/bzly',
        apple: 'https://music.apple.com/artist/bzly'
      }
    })

    return NextResponse.json({
      message: 'Test models created successfully',
      news: testNews,
      album: testAlbum
    })
  } catch (error) {
    console.error('Test models error:', error)
    return NextResponse.json(
      { error: 'Failed to test models', details: error },
      { status: 500 }
    )
  }
}

// Clean up test data
export async function DELETE() {
  try {
    await connectDB()
    await News.deleteMany({ title: 'Test Article' })
    await Album.deleteMany({ title: 'Test Album' })
    return NextResponse.json({ message: 'Test data cleaned up successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to clean up test data' },
      { status: 500 }
    )
  }
} 