import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const width = searchParams.get('width') || '48'
    const height = searchParams.get('height') || '48'

    if (!type) {
      return new NextResponse('Type parameter is required', { status: 400 })
    }

    // Get the file path
    const filePath = path.join(process.cwd(), 'public', `${type}.svg`)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return new NextResponse('Asset not found', { status: 404 })
    }

    // Read the SVG file
    const svg = fs.readFileSync(filePath, 'utf-8')

    // Add width and height attributes
    const svgWithDimensions = svg.replace('<svg', `<svg width="${width}" height="${height}"`)

    return new NextResponse(svgWithDimensions, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    })
  } catch (error) {
    console.error('Asset error:', error)
    return new NextResponse('Error serving asset', { status: 500 })
  }
} 