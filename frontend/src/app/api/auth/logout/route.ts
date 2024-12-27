import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = cookies()

  cookieStore.delete('auth_token')

  const url = new URL('/login', process.env.NEXT_PUBLIC_APP_URL)

  return NextResponse.redirect(url)
}
