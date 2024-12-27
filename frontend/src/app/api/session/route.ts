import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('auth_token')?.value

  if (!token) {
    return NextResponse.json({ authenticated: false, message: 'Token not found.' }, { status: 200 })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    return NextResponse.json({
      authenticated: true,
      token: token,
      user_id: (decoded as any).user_id
    })
  } catch (err) {
    console.error('JWT verification failed:', err)
    return NextResponse.json({ authenticated: false, message: 'Invalid token.' }, { status: 200 })
  }
}
