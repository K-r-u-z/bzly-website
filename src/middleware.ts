import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtectedRoute = path.startsWith('/admin/dashboard')
  const token = request.cookies.get('adminToken')?.value

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    try {
      // Verify JWT token
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      )
    } catch (error) {
      // Token is invalid or expired
      const response = NextResponse.redirect(new URL('/admin', request.url))
      response.cookies.delete('adminToken')
      return response
    }
  }

  // Redirect logged-in users away from login page
  if (path === '/admin' && token) {
    try {
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      )
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    } catch (error) {
      // Token is invalid, clear it
      const response = NextResponse.next()
      response.cookies.delete('adminToken')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
} 