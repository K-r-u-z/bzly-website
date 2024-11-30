import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Newsletter from '@/models/Newsletter'

export async function GET() {
  try {
    console.log('Testing database connection...')
    await connectDB()
    console.log('Database connected successfully')

    // Try to create a test document
    const testSubscriber = await Newsletter.create({
      email: 'test@example.com',
      isSubscribed: true,
      subscribedAt: new Date()
    })
    console.log('Test subscriber created:', testSubscriber)

    // Delete the test document
    await Newsletter.findByIdAndDelete(testSubscriber._id)
    console.log('Test subscriber deleted')

    return NextResponse.json({ 
      success: true, 
      message: 'Database connection and model working correctly' 
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { 
      status: 500 
    })
  }
} 