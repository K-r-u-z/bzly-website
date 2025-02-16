interface EmailData {
  title: string;
  content?: string;
  category?: string;
  articleId?: string;
  email: string;
}

export function generateEmail(data: EmailData) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${data.title}</title>
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(180deg, #000000 0%, #0f172a 100%); color: #ffffff; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; text-align: center; background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(2,6,23,0.9) 100%); border-radius: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.2);">
    <!-- Logo Container -->
    <div style="width: 100%; text-align: center; margin-bottom: 30px;">
      <img src="${process.env.NEXT_PUBLIC_BASE_URL}/bzly-logo.png" alt="BZLY" width="120" style="display: inline-block;"/>
    </div>
    
    <!-- Category Badge Container -->
    <div style="width: 100%; text-align: center; margin-bottom: 30px;">
      <span style="display: inline-block; background-color: #00ff95; color: #000000; padding: 4px 16px; border-radius: 999px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
        ${data.category || 'UPDATE'}
      </span>
    </div>

    <!-- Title -->
    <h1 style="color: #00a2ff; font-size: 28px; margin: 0 0 30px 0; font-weight: 700;">
      ${data.title}
    </h1>
    
    <!-- CTA Button -->
    <a href="${process.env.NEXT_PUBLIC_BASE_URL}${data.articleId ? `/news/${data.articleId}` : ''}" 
       style="display: inline-block; background-color: #00a2ff; color: #ffffff; text-decoration: none; padding: 10px 25px; border-radius: 999px; font-size: 14px; font-weight: bold; text-transform: uppercase;">
      ${data.articleId ? 'VIEW POST' : 'VISIT BZLY'}
    </a>

    <!-- Footer -->
    <div style="margin-top: 40px; border-top: 1px solid #222222; padding-top: 20px;">
      <p style="color: #666666; margin-bottom: 15px; font-size: 12px;">Follow BZLY</p>
      <div style="margin-bottom: 20px;">
        <a href="https://soundcloud.com/bzly" style="margin: 0 8px;"><img src="${process.env.NEXT_PUBLIC_BASE_URL}/icons/soundcloud.png" alt="SoundCloud" width="20"/></a>
        <a href="#" style="margin: 0 8px;"><img src="${process.env.NEXT_PUBLIC_BASE_URL}/icons/spotify.png" alt="Spotify" width="20"/></a>
        <a href="https://x.com/peantrb" style="margin: 0 8px;"><img src="${process.env.NEXT_PUBLIC_BASE_URL}/icons/twitter.png" alt="X" width="20"/></a>
      </div>
      <p style="color: #666666; font-size: 11px; margin: 0 0 10px 0;">
        You're receiving this email because you subscribed to BZLY updates
      </p>
      <p style="color: #666666; font-size: 11px; margin: 0;">
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/newsletter/unsubscribe?email=${data.email}" style="color: #00a2ff; text-decoration: none;">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>`
} 