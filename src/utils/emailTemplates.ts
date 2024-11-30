// Helper function for category colors
export function getCategoryColorClass(category: string): string {
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
export function generateNewsEmail(article: any, email: string) {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>BZLY News</title>
  </head>
  <body style="margin:0;padding:0;background:#0f172a;color:#f8fafc;font-family:Helvetica,Arial,sans-serif">
    <div style="max-width:600px;margin:0 auto;background:linear-gradient(180deg,rgba(0,0,0,0.8),rgba(2,6,23,0.9))">
      <div style="padding:40px 20px;text-align:center">
        <img src="${process.env.NEXT_PUBLIC_BASE_URL}/bzly-logo.png" alt="BZLY" width="120" style="margin-bottom:40px">
        <div style="background:linear-gradient(135deg,rgba(14,165,233,0.1),rgba(0,0,0,0.4));border-radius:16px;padding:40px 30px;border:1px solid rgba(14,165,233,0.2)">
          <img src="${article.image}" alt="Article Image" style="width:300px;height:200px;object-fit:cover;border-radius:12px;margin-bottom:20px">
          <p style="color:#cbd5e1;font-size:16px;line-height:1.8;margin:0 0 35px;text-align:center">${article.content.substring(0, 150)}...</p>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/news/${article._id}" style="display:inline-block;background:linear-gradient(135deg,#0ea5e9,#2563eb);color:white;text-decoration:none;padding:14px 35px;border-radius:9999px;font-weight:bold;font-size:16px;text-transform:uppercase;letter-spacing:1px">READ FULL ARTICLE</a>
        </div>
        <div style="margin:30px 0">
          <p style="color:#94a3b8;margin-bottom:15px">Follow BZLY</p>
          <a href="https://soundcloud.com/bzly" style="margin:0 10px"><img src="${process.env.NEXT_PUBLIC_BASE_URL}/icons/soundcloud.png" alt="SoundCloud" width="24"></a>
          <a href="#" style="margin:0 10px"><img src="${process.env.NEXT_PUBLIC_BASE_URL}/icons/spotify.png" alt="Spotify" width="24"></a>
          <a href="https://x.com/peantrb" style="margin:0 10px"><img src="${process.env.NEXT_PUBLIC_BASE_URL}/icons/twitter.png" alt="X" width="24"></a>
        </div>
        <div style="border-top:1px solid rgba(14,165,233,0.2);padding-top:30px;color:#64748b;font-size:12px">
          <p style="margin-bottom:15px">You're receiving this email because you subscribed to www.bzly.info.</p>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/newsletter/unsubscribe?email=${email}" style="color:#0ea5e9;text-decoration:none;border-bottom:1px solid rgba(14,165,233,0.3)">Unsubscribe</a>
        </div>
      </div>
    </div>
  </body>
</html>`.replace(/\s+/g, ' ').trim();
}

// Function to generate welcome email
export function generateWelcomeEmail(email: string) {
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>You are now officially a DAWG!</title></head><body style="margin: 0; padding: 0; background-color: #0f172a; color: #f8fafc; font-family: \'Helvetica Neue\', Arial, sans-serif;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(2,6,23,0.9) 100%);"><tr><td style="padding: 40px 20px; text-align: center;"><div style="margin-bottom: 40px;"><img src="' + process.env.NEXT_PUBLIC_BASE_URL + '/bzly-logo.png" alt="BZLY" width="120" height="120" style="width: 120px; height: auto;"/></div><div style="background: linear-gradient(135deg, rgba(14,165,233,0.1) 0%, rgba(0,0,0,0.4) 100%); border-radius: 16px; padding: 40px 30px; margin-bottom: 30px; border: 1px solid rgba(14,165,233,0.2); box-shadow: 0 8px 32px rgba(0,0,0,0.2);"><h1 style="color: #0ea5e9; margin: 0 0 30px 0; font-size: 32px; line-height: 1.4; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">You are now officially a DAWG!</h1><p style="color: #cbd5e1; font-size: 16px; line-height: 1.8; margin-bottom: 35px; text-align: left;">Thank you for turning on post notifications. You\'ll be the first to know about:</p><div style="text-align: left; margin-bottom: 35px;"><div style="background: rgba(14,165,233,0.1); padding: 15px; border-radius: 12px; margin-bottom: 10px; color: #e2e8f0;">🎵 New music releases (early access)</div><div style="background: rgba(14,165,233,0.1); padding: 15px; border-radius: 12px; margin-bottom: 10px; color: #e2e8f0;">🎬 Behind-the-scenes content</div><div style="background: rgba(14,165,233,0.1); padding: 15px; border-radius: 12px; color: #e2e8f0;">🎉 Exclusive announcements</div></div><a href="' + process.env.NEXT_PUBLIC_BASE_URL + '" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%); color: white; text-decoration: none; padding: 14px 35px; border-radius: 9999px; font-weight: bold; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 12px rgba(14,165,233,0.3);">Visit BZLY</a></div><div style="margin-bottom: 30px;"><p style="color: #94a3b8; margin-bottom: 15px;">Follow BZLY</p><div><a href="https://soundcloud.com/bzly" style="text-decoration: none; margin: 0 10px;"><img src="' + process.env.NEXT_PUBLIC_BASE_URL + '/icons/soundcloud.png" alt="SoundCloud" width="24" height="24" style="width: 24px; height: 24px;"></a><a href="#" style="text-decoration: none; margin: 0 10px;"><img src="' + process.env.NEXT_PUBLIC_BASE_URL + '/icons/spotify.png" alt="Spotify" width="24" height="24" style="width: 24px; height: 24px;"></a><a href="https://x.com/peantrb" style="text-decoration: none; margin: 0 10px;"><img src="' + process.env.NEXT_PUBLIC_BASE_URL + '/icons/twitter.png" alt="X (Twitter)" width="24" height="24" style="width: 24px; height: 24px;"></a></div></div><div style="border-top: 1px solid rgba(14,165,233,0.2); padding-top: 30px; color: #64748b; font-size: 12px;"><p style="margin-bottom: 15px;">You\'re receiving this email because you subscribed to www.bzly.info.</p><p style="margin: 0;"><a href="' + process.env.NEXT_PUBLIC_BASE_URL + '/newsletter/unsubscribe?email=' + email + '" style="color: #0ea5e9; text-decoration: none; border-bottom: 1px solid rgba(14,165,233,0.3);">Unsubscribe</a></p></div></td></tr></table></body></html>'
} 