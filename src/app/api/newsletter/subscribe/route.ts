import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Newsletter from '@/models/Newsletter'
import { Resend } from 'resend'
import { generateEmail } from '@/utils/emailTemplates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    await connectDB()
    const { email, type = 'welcome' } = await request.json()

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email })
    if (existingSubscriber) {
      if (existingSubscriber.isSubscribed) {
        return NextResponse.json(
          { message: 'Email already subscribed' },
          { status: 400 }
        )
      } else {
        // Resubscribe
        existingSubscriber.isSubscribed = true
        await existingSubscriber.save()
        return NextResponse.json({ message: 'Successfully resubscribed!' })
      }
    }

    // Create new subscriber
    await Newsletter.create({ email })

    // Send welcome email
    await resend.emails.send({
      from: 'BZLY <noreply@bzly.info>',
      to: email,
      subject: 'You are now officially a DAWG!'.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ''),
      html: generateEmail({
        title: 'You are now officially a DAWG!',
        category: 'WELCOME',
        email
      })
    })

    return NextResponse.json({ 
      message: 'Successfully subscribed! Check your email for confirmation.',
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    )
  }
} 