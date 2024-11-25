import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import News from '@/models/News'

export async function GET() {
  try {
    await connectDB()
    const newsItems = await News.find().sort({ date: -1 })
    return NextResponse.json(newsItems)
  } catch (error) {
    console.error('Failed to fetch news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()

    const newsItem = await News.create({
      ...body,
      date: new Date(body.date)
    })

    return NextResponse.json(newsItem, { status: 201 })
  } catch (error) {
    console.error('Failed to create news:', error)
    return NextResponse.json(
      { error: 'Failed to create news' },
      { status: 500 }
    )
  }
} 