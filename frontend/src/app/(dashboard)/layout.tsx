import type { ChildrenType } from '@core/types'

import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'

import Providers from '@components/Providers'
import Navigation from '@components/layout/vertical/Navigation'
import Navbar from '@components/layout/vertical/Navbar'

import RootLayout from './rootLayout'

export const metadata = {
  title: 'Vax Platform',
  description: 'A platform built for versatility and efficiency.'
}

const Layout = async ({ children }: ChildrenType) => {
  const direction = 'ltr'

  return (
    <RootLayout>
      <Providers direction={direction}>
        <LayoutWrapper
          verticalLayout={
            <VerticalLayout navigation={<Navigation />} navbar={<Navbar />}>
              {children}
            </VerticalLayout>
          }
        />
      </Providers>
    </RootLayout>
  )
}

export default Layout
