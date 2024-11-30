import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Newsletter from '@/models/Newsletter'

export async function POST(request: Request) {
  try {
    await connectDB()
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const result = await Newsletter.findOneAndUpdate(
      { email: email.toLowerCase() },
      { $set: { isSubscribed: false } }
    )

    if (!result) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
} 