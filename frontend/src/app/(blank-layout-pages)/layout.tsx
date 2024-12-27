import { ToastContainer } from 'react-toastify'

import type { ChildrenType } from '@core/types'

import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import { LoadingProvider } from '@/context/LoadingContext'
import { AuthProvider } from '@/context/AuthContext'

const Layout = ({ children }: ChildrenType) => {
  const direction = 'ltr'

  return (
    <LoadingProvider>
      <AuthProvider>
        <Providers direction={direction}>
          <BlankLayout>{children}</BlankLayout>
          <ToastContainer />
        </Providers>
      </AuthProvider>
    </LoadingProvider>
  )
}

export default Layout
