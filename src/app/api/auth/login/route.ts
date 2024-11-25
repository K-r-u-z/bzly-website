import { NextResponse } from 'next/server'
import { sign } from 'jsonwebtoken'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    const { username, password } = body

    // Find user
    const user = await User.findOne({ username })
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = sign(
      { userId: user._id, username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    // Create response with token
    const response = NextResponse.json(
      { success: true, token },
      { status: 200 }
    )

    // Set HTTP-only cookie
    response.cookies.set({
      name: 'adminToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 // 1 hour
    })

    return response
  } catch (error) {
    console.error('Login failed:', error)
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
} 