'use client'

import type { ReactNode } from 'react'
import { createContext, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import cookies from 'js-cookie'

import * as auth from '../services/AuthApi'
import type { AuthData } from '../types/components'
import useAppState from '../hooks/useAppState'
import { useLoading } from '@/context/LoadingContext'

interface AuthContextData {
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
  userId: string
  setUserId: (value: string) => void
  jwtToken: string
  setJwtToken: (jwtToken: string) => void
  data: AuthData
  setData: (data: AuthData) => void
  signIn: () => Promise<void>
  signUp: () => Promise<void>
  signOut: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data, setData, isAuth, setIsAuth, userId, setUserId, jwtToken, setJwtToken } = useAppState()
  const { startLoading, stopLoading } = useLoading()
  const router = useRouter()

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/session', {
          method: 'GET',
          credentials: 'include'
        })

        if (!response.ok) {
          setIsAuth(false)

          return
        }

        const data = await response.json()

        setJwtToken(data.token)
        setIsAuth(true)
        setUserId(data.user_id)
      } catch (error) {
        console.error('Error fetching session:', error)
        setIsAuth(false)
      }
    }

    fetchSession()
  }, [])

  const signIn = async (): Promise<void> => {
    try {
      startLoading()

      const loginData: AuthData = data

      const { token } = await auth.signIn(loginData)

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token }),
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Error setting authentication cookie')
      }

      const decodedToken: { user_id: string } = jwtDecode(token)

      setIsAuth(true)
      setUserId(decodedToken.user_id)

      router.push('/')
      await new Promise(resolve => setTimeout(resolve, 1000))
      stopLoading()
    } catch (error: unknown) {
      stopLoading()
      console.error('Error trying to log in:', error)
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.error(`Error: ${error instanceof Error ? error.response.data.message : 'Unknown error'}`)
    }
  }

  const signOut = async (): Promise<void> => {
    try {
      startLoading()

      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })

      if (!response.ok) {
        console.error('Failed to logout')
        toast.error('Error trying to sign out. Try again later')

        return
      }

      setIsAuth(false)
      setUserId('')

      window.location.assign('/login')
      await new Promise(resolve => setTimeout(resolve, 500))
      stopLoading()
    } catch (error: unknown) {
      stopLoading()
      console.error('Error trying to logout:', error)
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.error('Error trying to sign out. Try again later')
    }
  }

  const signUp = async (): Promise<void> => {
    try {
      startLoading()

      const signupData: AuthData = data

      await auth.signUp(signupData)

      router.push('/login')

      await new Promise(resolve => setTimeout(resolve, 1000))

      toast.success('Registration successful! You can access right now')
    } catch (error: unknown) {
      stopLoading()
      console.error('Error trying to register:', error)
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.error(`Error: ${error instanceof Error ? error.response.data.message : 'Unknown error'}`)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        jwtToken,
        setJwtToken,
        userId,
        setUserId,
        data,
        setData,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
