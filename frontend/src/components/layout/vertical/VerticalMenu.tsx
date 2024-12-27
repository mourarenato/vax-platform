'use client'

import { useTheme } from '@mui/material/styles'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import { useLoading } from '@/context/LoadingContext'
import { toast } from 'react-toastify'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: { scrollMenu: (container: any, isPerfectScrollbar: boolean) => void }) => {
  const theme = useTheme()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()
  const router = useRouter()
  const pathname = usePathname()
  const { startLoading, stopLoading } = useLoading()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  const handleNavigation = async (url: string) => {
    if (!isMounted) {
      return
    }

    try {
      startLoading()

      router.push(url)

      await new Promise<void>(resolve => {
        const checkNavigation = () => {
          if (pathname === url) {
            resolve()
          }
        }

        const interval = setInterval(checkNavigation, 100)
        setTimeout(() => clearInterval(interval), 5000)
      })

      stopLoading()
    } catch (error: unknown) {
      console.error('Error trying to navigate:', error)
      stopLoading()
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.error(`Error trying to navigate`)
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Vertical Menu */}
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >
        <MenuItem
          href='/'
          icon={<i className='ri-home-line' />}
          onClick={e => {
            e.preventDefault()
            handleNavigation('/')
          }}
        >
          Home
        </MenuItem>
        <MenuSection label='Vax & People'>
          <SubMenu label='Register' icon={<i className='ri-syringe-line' />}>
            <MenuItem
              href='/register/vaccines'
              onClick={e => {
                e.preventDefault()
                handleNavigation('/register/vaccines')
              }}
            >
              Vaccines
            </MenuItem>
            <MenuItem
              href='/register/vaxxed-people'
              onClick={e => {
                e.preventDefault()
                handleNavigation('/register/vaxxed-people')
              }}
            >
              Vaccinated People
            </MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label='Reports'>
          <SubMenu label='Unvaxxed People' icon={<i className='ri-file-text-line' />}>
            <MenuItem
              href='/reports/check-progress'
              onClick={e => {
                e.preventDefault()
                handleNavigation('/reports/check-progress')
              }}
            >
              Check Progress
            </MenuItem>
          </SubMenu>
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
