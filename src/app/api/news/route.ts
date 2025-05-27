import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import News from '@/models/News'
import Newsletter from '@/models/Newsletter'
import { Resend } from 'resend'
import { generateEmail } from '@/utils/emailTemplates'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // Send newsletter to subscribers
    const subscribers = await Newsletter.find({ isSubscribed: true })
    
    if (subscribers.length > 0) {
      const emails = subscribers.map(sub => sub.email)
      
      await resend.emails.send({
        from: 'BZLY <noreply@bzly.info>',
        to: emails[0],
        bcc: emails.slice(1),
        subject: `New ${body.category}: ${body.title.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '')}`,
        html: generateEmail({
          title: body.title,
          content: body.content,
          category: body.category,
          articleId: newsItem._id,
          email: emails[0]
        })
      })
    }

    return NextResponse.json(newsItem, { status: 201 })
  } catch (error) {
    console.error('Failed to create news:', error)
    return NextResponse.json(
      { error: 'Failed to create news' },
      { status: 500 }
    )
  }
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'Release':
      return 'bg-red-100'
    case 'Update':
      return 'bg-red-300'
    case 'Announcement':
      return 'bg-red-400'
    case 'Launch':
      return 'bg-red-500'
    default:
      return '#880203' // red-300
  }
} 