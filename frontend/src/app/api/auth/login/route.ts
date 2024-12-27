import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { token } = await req.json()

    if (!token) {
      return new Response(JSON.stringify({ error: 'No token provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    jwt.verify(token, process.env.JWT_SECRET || 'default_secret')

    const response = NextResponse.json({ authenticated: true })
    response.cookies.set('auth_token', token, {
      httpOnly: true, // Deny access using javascript (via document.cookie)
      secure: false, // Use process.env.NODE_ENV === 'production' in production environment (cuz might be HTTPS),
      maxAge: 60 * 60 * 24,
      path: '/'
    })

    return response
  } catch (error: unknown) {
    console.error('JWT verification failed:', error.message || error)

    return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
