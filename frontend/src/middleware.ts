import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  user_id: string
  exp?: number
}

export function middleware(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get('auth_token')?.value
  const url = new URL(request.url)

  const redirectIfAuthenticated = ['/login', '/register', '/forgot-password']

  if (token) {
    try {
      const decodedToken: DecodedToken = jwtDecode(token)
      const currentTime = Date.now() / 1000

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        return NextResponse.redirect(new URL('/api/auth/logout', request.url))
      }

      if (redirectIfAuthenticated.includes(url.pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
      }

      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL('/api/auth/logout', request.url))
    }
  }

  if (!redirectIfAuthenticated.includes(url.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/register', '/forgot-password', '/my-profile'] //intercepts routes
}
