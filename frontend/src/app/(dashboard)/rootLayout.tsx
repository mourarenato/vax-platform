'use client'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { AuthProvider } from '@/context/AuthContext'
import { LoadingProvider } from '@/context/LoadingContext'
import type { ChildrenType } from '@core/types'
import '@/app/globals.css'
import '@assets/iconify-icons/generated-icons.css'
import { DashboardProvider } from '@/context/DashboardContext'

const RootLayout = ({ children }: ChildrenType) => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <DashboardProvider>
          <body className='flex is-full min-bs-full flex-auto flex-col' dir='ltr'>
            {children}
            <ToastContainer />
          </body>
        </DashboardProvider>
      </AuthProvider>
    </LoadingProvider>
  )
}

export default RootLayout
