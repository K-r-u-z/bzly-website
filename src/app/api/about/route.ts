import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import About from '@/models/About'

export async function GET() {
  try {
    await connectDB()
    const about = await About.findOne()
    return NextResponse.json(about || {
      journey: "BZLY emerged from the vibrant hip-hop underground, bringing fresh perspectives and raw energy to the scene. With a distinctive flow and authentic lyrics, BZLY crafts stories that resonate with real-life experiences and emotions.\n\nEach track is a piece of the story, combining hard-hitting beats with meaningful lyrics that speak truth to power and connect with listeners on a personal level.",
      image: "",
      milestones: [
        {
          number: "1",
          label: "Albums Dropped",
          description: "First tracks released on major platforms"
        },
        {
          number: "100+",
          label: "Monthly Listeners",
          description: "Growing our community organically"
        },
        {
          number: "∞",
          label: "New stories in the works",
          description: "More coming soon!"
        }
      ]
    })
  } catch (error) {
    console.error('Failed to fetch about:', error)
    return NextResponse.json(
      { error: 'Failed to fetch about section' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()

    // Update or create the about section
    const about = await About.findOneAndUpdate(
      {},
      { 
        journey: body.journey, 
        image: body.image,
        milestones: body.milestones 
      },
      { upsert: true, new: true }
    )

    return NextResponse.json(about)
  } catch (error) {
    console.error('Failed to update about:', error)
    return NextResponse.json(
      { error: 'Failed to update about section' },
      { status: 500 }
    )
  }
} 