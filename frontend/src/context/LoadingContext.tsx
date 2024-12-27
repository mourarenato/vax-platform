'use client'

import type { ReactNode } from 'react'
import React, { createContext, useContext, useState, useEffect } from 'react'

import { usePathname } from 'next/navigation'

import LoadingComponent from '@components/CircularProgress'

interface LoadingContextType {
  loading: boolean
  startLoading: () => void
  stopLoading: () => void
}

const LoadingContext = createContext<LoadingContextType>({} as LoadingContextType)

export const useLoading = () => {
  const context = useContext(LoadingContext)

  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }

  return context
}

interface LoadingProviderProps {
  children: ReactNode // Define explicitly o tipo de children
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)

  useEffect(() => {
    if (pathname) {
      stopLoading()
    }
  }, [pathname])

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {loading ? <LoadingComponent /> : children}
    </LoadingContext.Provider>
  )
}
