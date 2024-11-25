import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    await connectDB()

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: process.env.ADMIN_USERNAME })
    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin user already exists' },
        { status: 400 }
      )
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, salt)

    // Create admin user
    const adminUser = await User.create({
      username: process.env.ADMIN_USERNAME,
      password: hashedPassword,
      role: 'admin'
    })

    return NextResponse.json({
      message: 'Admin user created successfully',
      user: {
        username: adminUser.username,
        role: adminUser.role
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Setup failed:', error)
    return NextResponse.json(
      { error: 'Failed to setup admin user' },
      { status: 500 }
    )
  }
} 