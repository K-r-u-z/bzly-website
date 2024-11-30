import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Newsletter from '@/models/Newsletter'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Helper function for category colors
function getCategoryColorClass(category: string): string {
  switch (category) {
    case 'Release':
      return 'background-color: #0284c7;' // sky-600
    case 'Tour':
      return 'background-color: #2563eb;' // blue-600
    case 'Update':
      return 'background-color: #0ea5e9;' // sky-500
    case 'Launch':
      return 'background-color: #16a34a;' // green-600
    default:
      return 'background-color: #4b5563;' // gray-600
  }
}

// Function to generate news article email
function generateNewsEmail(article: any, email: string) {
  // Create a preview of the content (first 150 characters)
  const contentPreview = article.content.length > 150 
    ? article.content.substring(0, 150) + '...' 
    : article.content;

  // Handle both base64 and URL images
  const articleImageUrl = article.image.startsWith('data:image') 
    ? article.image 
    : article.image.startsWith('http') 
      ? article.image 
      : article.image;

  return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' + article.title + '</title></head><body style="margin: 0; padding: 0; background-color: #0f172a; color: #f8fafc; font-family: \'Helvetica Neue\', Arial, sans-serif;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(2,6,23,0.9) 100%);"><tr><td style="padding: 40px 20px; text-align: center;"><div style="margin-bottom: 40px;"><img src="' + process.env.NEXT_PUBLIC_BASE_URL + '/bzly-logo.png" alt="BZLY" width="120" height="120" style="width: 120px; height: auto;"/></div><div style="background: linear-gradient(135deg, rgba(14,165,233,0.1) 0%, rgba(0,0,0,0.4) 100%); border-radius: 16px; padding: 40px 30px; margin-bottom: 30px; border: 1px solid rgba(14,165,233,0.2); box-shadow: 0 8px 32px rgba(0,0,0,0.2);"><div style="margin-bottom: 30px; position: relative;"><img src="' + articleImageUrl + '" alt="' + article.title + '" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 20px;"/><span style="position: absolute; top: 16px; left: 16px; padding: 4px 16px; border-radius: 9999px; color: white; font-size: 14px; ' + getCategoryColorClass(article.category) + '">' + article.category + '</span></div><h1 style="color: #0ea5e9; margin: 0 0 30px 0; font-size: 32px; line-height: 1.4; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">' + article.title + '</h1><div style="color: #cbd5e1; font-size: 16px; line-height: 1.8; margin-bottom: 35px; text-align: left;">' + contentPreview + '</div><a href="' + process.env.NEXT_PUBLIC_BASE_URL + '/news/' + article._id + '" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%); color: white; text-decoration: none; padding: 14px 35px; border-radius: 9999px; font-weight: bold; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 12px rgba(14,165,233,0.3);">Read Full Article</a></div><div style="margin-bottom: 30px;"><p style="color: #94a3b8; margin-bottom: 15px;">Follow BZLY</p><div><a href="https://soundcloud.com/bzly" style="text-decoration: none; margin: 0 10px;"><img src="' + process.env.NEXT_PUBLIC_BASE_URL + '/icons/soundcloud.png" alt="SoundCloud" width="24" height="24" style="width: 24px; height: 24px;"></a><a href="#" style="text-decoration: none; margin: 0 10px;"><img src="' + process.env.NEXT_PUBLIC_BASE_URL + '/icons/spotify.png" alt="Spotify" width="24" height="24" style="width: 24px; height: 24px;"></a><a href="https://x.com/peantrb" style="text-decoration: none; margin: 0 10px;"><img src="' + process.env.NEXT_PUBLIC_BASE_URL + '/icons/twitter.png" alt="X (Twitter)" width="24" height="24" style="width: 24px; height: 24px;"></a></div></div><div style="border-top: 1px solid rgba(14,165,233,0.2); padding-top: 30px; color: #64748b; font-size: 12px;"><p style="margin-bottom: 15px;">You\'re receiving this email because you subscribed to www.bzly.info.</p><p style="margin: 0;"><a href="' + process.env.NEXT_PUBLIC_BASE_URL + '/newsletter/unsubscribe?email=' + email + '" style="color: #0ea5e9; text-decoration: none; border-bottom: 1px solid rgba(14,165,233,0.3);">Unsubscribe</a></p></div></td></tr></table></body></html>'
}

// Function to generate welcome email
function generateWelcomeEmail(email: string) {
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>You are now officially a DAWG!</title></head><body style="margin: 0; padding: 0; background-color: #0f172a; color: #f8fafc; font-family: \'Helvetica Neue\', Arial, sans-serif;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(2,6,23,0.9) 100%);"><tr><td style="padding: 40px 20px; text-align: center;"><div style="margin-bottom: 40px;"><img src="' + process.env.NEXT_PUBLIC_BASE_URL + '/bzly-logo.png" alt="BZLY" width="120" height="120" style="width: 120px; height: auto;"/></div><div style="background: linear-gradient(135deg, rgba(14,165,233,0.1) 0%, rgba(0,0,0,0.4) 100%); border-radius: 16px; padding: 40px 30px; margin-bottom: 30px; border: 1px solid rgba(14,165,233,0.2); box-shadow: 0 8px 32px rgba(0,0,0,0.2);"><h1 style="color: #0ea5e9; margin: 0 0 30px 0; font-size: 32px; line-height: 1.4; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">You are now officially a DAWG!</h1><p style="color: #cbd5e1; font-size: 16px; line-height: 1.8; margin-bottom: 35px; text-align: left;">Thank you for turning on post notifications. You\'ll be the first to know about:</p><div style="text-align: left; margin-bottom: 35px;"><div style="background: rgba(14,165,233,0.1); padding: 15px; border-radius: 12px; margin-bottom: 10px; color: #e2e8f0;">🎵 New music releases (early access)</div><div style="background: rgba(14,165,233,0.1); padding: 15px; border-radius: 12px; margin-bottom: 10px; color: #e2e8f0;">🎬 Behind-the-scenes content</div><div style="background: rgba(14,165,233,0.1); padding: 15px; border-radius: 12px; color: #e2e8f0;">🎉 Exclusive announcements</div></div><a href="' + process.env.NEXT_PUBLIC_BASE_URL + '" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%); color: white; text-decoration: none; padding: 14px 35px; border-radius: 9999px; font-weight: bold; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 12px rgba(14,165,233,0.3);">Visit BZLY</a></div><div style="margin-bottom: 30px;"><p style="color: #94a3b8; margin-bottom: 15px;">Follow BZLY</p><div><a href="https://soundcloud.com/bzly" style="text-decoration: none; margin: 0 10px;"><img src="' + process.env.NEXT_PUBLIC_BASE_URL + '/icons/soundcloud.png" alt="SoundCloud" width="24" height="24" style="width: 24px; height: 24px;"></a><a href="#" style="text-decoration: none; margin: 0 10px;"><img src="' + process.env.NEXT_PUBLIC_BASE_URL + '/icons/spotify.png" alt="Spotify" width="24" height="24" style="width: 24px; height: 24px;"></a><a href="https://x.com/peantrb" style="text-decoration: none; margin: 0 10px;"><img src="' + process.env.NEXT_PUBLIC_BASE_URL + '/icons/twitter.png" alt="X (Twitter)" width="24" height="24" style="width: 24px; height: 24px;"></a></div></div><div style="border-top: 1px solid rgba(14,165,233,0.2); padding-top: 30px; color: #64748b; font-size: 12px;"><p style="margin-bottom: 15px;">You\'re receiving this email because you subscribed to www.bzly.info.</p><p style="margin: 0;"><a href="' + process.env.NEXT_PUBLIC_BASE_URL + '/newsletter/unsubscribe?email=' + email + '" style="color: #0ea5e9; text-decoration: none; border-bottom: 1px solid rgba(14,165,233,0.3);">Unsubscribe</a></p></div></td></tr></table></body></html>'
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const { email, type = 'welcome', article = null } = await request.json()

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

    // Send appropriate email based on type
    await resend.emails.send({
      from: 'BZLY <noreply@bzly.info>',
      to: email,
      subject: type === 'welcome' ? 'You are now officially a DAWG!' : article.title,
      html: type === 'welcome' ? generateWelcomeEmail(email) : generateNewsEmail(article, email)
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