import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import News from '@/models/News'
import Newsletter from '@/models/Newsletter'
import { Resend } from 'resend'

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
        subject: `New ${body.category}: ${body.title.replace(/<[^>]*>/g, '')}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>BZLY News: ${body.title.replace(/<[^>]*>/g, '')}</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #0f172a; color: #f8fafc; font-family: 'Helvetica Neue', Arial, sans-serif;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(2,6,23,0.9) 100%);">
                <tr>
                  <td style="padding: 40px 20px; text-align: center;">
                    <!-- Logo -->
                    <div style="margin-bottom: 40px;">
                      <img 
                        src="${process.env.NEXT_PUBLIC_BASE_URL}/bzly-logo.png"
                        alt="BZLY"
                        width="120"
                        height="120"
                        style="width: 120px; height: auto;"
                      />
                    </div>
                    
                    <!-- Category Badge -->
                    <div style="margin-bottom: 30px;">
                      <span style="
                        background: ${getCategoryColor(body.category)};
                        color: white;
                        padding: 8px 20px;
                        border-radius: 9999px;
                        font-size: 14px;
                        font-weight: bold;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        box-shadow: 0 4px 6px rgba(14,165,233,0.2);
                      ">
                        ${body.category}
                      </span>
                    </div>

                    <!-- Main Content -->
                    <div style="
                      background: linear-gradient(135deg, rgba(14,165,233,0.1) 0%, rgba(0,0,0,0.4) 100%);
                      border-radius: 16px;
                      padding: 40px 30px;
                      margin-bottom: 30px;
                      border: 1px solid rgba(14,165,233,0.2);
                      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                    ">
                      <h1 style="
                        color: #0ea5e9;
                        margin: 0 0 30px 0;
                        font-size: 32px;
                        line-height: 1.4;
                        font-weight: 700;
                        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                      ">
                        ${body.title}
                      </h1>
                      
                      ${body.image ? `
                        <div style="margin-bottom: 30px;">
                          <img 
                            src="${body.image}" 
                            alt="Article Image" 
                            style="
                              max-width: 100%;
                              height: auto;
                              border-radius: 12px;
                              box-shadow: 0 8px 16px rgba(0,0,0,0.3);
                            "
                          >
                        </div>
                      ` : ''}

                      <p style="
                        color: #cbd5e1;
                        font-size: 16px;
                        line-height: 1.8;
                        margin-bottom: 35px;
                        text-align: left;
                      ">
                        ${body.excerpt}
                      </p>
                      
                      <a 
                        href="${process.env.NEXT_PUBLIC_BASE_URL}/news/${newsItem._id}"
                        style="
                          display: inline-block;
                          background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
                          color: white;
                          text-decoration: none;
                          padding: 14px 35px;
                          border-radius: 9999px;
                          font-weight: bold;
                          font-size: 16px;
                          text-transform: uppercase;
                          letter-spacing: 1px;
                          box-shadow: 0 4px 12px rgba(14,165,233,0.3);
                        "
                      >
                        Read Full Article
                      </a>
                    </div>
                    
                    <!-- Social Links -->
                    <div style="margin-bottom: 30px;">
                      <p style="color: #94a3b8; margin-bottom: 15px;">Follow BZLY</p>
                      <div>
                        <a href="https://soundcloud.com/bzly" style="text-decoration: none; margin: 0 10px;">
                          <img src="${process.env.NEXT_PUBLIC_BASE_URL}/soundcloud.svg" alt="SoundCloud" width="24" height="24" style="width: 24px; height: 24px;">
                        </a>
                        <a href="https://open.spotify.com/artist/5qHLTNqZWtH9cT2uXZJqpD" style="text-decoration: none; margin: 0 10px;">
                          <img src="${process.env.NEXT_PUBLIC_BASE_URL}/spotify.svg" alt="Spotify" width="24" height="24" style="width: 24px; height: 24px;">
                        </a>
                        <a href="https://twitter.com/bzlymusic" style="text-decoration: none; margin: 0 10px;">
                          <img src="${process.env.NEXT_PUBLIC_BASE_URL}/x.svg" alt="X (Twitter)" width="24" height="24" style="width: 24px; height: 24px;">
                        </a>
                      </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="
                      border-top: 1px solid rgba(14,165,233,0.2);
                      padding-top: 30px;
                      color: #64748b;
                      font-size: 12px;
                    ">
                      <p style="margin-bottom: 15px;">
                        You're receiving this email because you subscribed to BZLY updates.
                      </p>
                      <p style="margin: 0;">
                        <a 
                          href="${process.env.NEXT_PUBLIC_BASE_URL}/newsletter/unsubscribe?email=${emails[0]}"
                          style="
                            color: #0ea5e9;
                            text-decoration: none;
                            border-bottom: 1px solid rgba(14,165,233,0.3);
                          "
                        >
                          Unsubscribe
                        </a>
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `
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
      return '#0ea5e9' // sky-600
    case 'Tour':
      return '#6366f1' // indigo-500
    case 'Update':
      return '#22c55e' // green-500
    case 'Launch':
      return '#8b5cf6' // purple-500
    case 'Announcement':
      return '#f59e0b' // amber-500
    default:
      return '#64748b' // gray-500
  }
} 