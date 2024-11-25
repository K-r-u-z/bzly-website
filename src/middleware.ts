import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /admin/dashboard)
  const path = request.nextUrl.pathname

  // Define paths that are protected (require authentication)
  const isProtectedRoute = path.startsWith('/admin/dashboard')

  // Get the token from the request cookies
  const token = request.cookies.get('adminToken')?.value

  // If the route is protected and there's no token,
  // redirect to the login page
  if (isProtectedRoute && !token) {
    const url = new URL('/admin', request.url)
    return NextResponse.redirect(url)
  }

  // If the user is logged in and trying to access the login page,
  // redirect them to the dashboard
  if (path === '/admin' && token) {
    const url = new URL('/admin/dashboard', request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: '/admin/:path*'
} 