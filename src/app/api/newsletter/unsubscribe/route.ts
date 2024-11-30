import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Newsletter from '@/models/Newsletter'

export async function POST(request: Request) {
  try {
    await connectDB()
    const { email } = await request.json()

    const subscriber = await Newsletter.findOne({ email })
    if (!subscriber) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 404 }
      )
    }

    subscriber.isSubscribed = false
    await subscriber.save()

    return NextResponse.json({ message: 'Successfully unsubscribed' })
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
} 