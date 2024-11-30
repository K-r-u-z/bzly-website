import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { to, subject, message, type } = await request.json();

    const fromEmail = type === 'noreply' 
      ? 'BZLY <noreply@bzly.info>'
      : 'BZLY <contact@bzly.info>';

    const data = await resend.emails.send({
      from: fromEmail,
      to: to,
      subject: subject,
      html: message,
      replyTo: type === 'noreply' ? undefined : 'contact@bzly.info',
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Reply email error:', error);
    return NextResponse.json(
      { error: 'Failed to send reply' },
      { status: 500 }
    );
  }
} 