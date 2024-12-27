'use client'

import { useRef, useState, useContext, useEffect } from 'react'
import type { MouseEvent } from 'react'

import { useRouter, usePathname } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

import { toast } from 'react-toastify'

import { AuthContext } from '@/context/AuthContext'
import { DashboardContext } from '@/context/DashboardContext'
import type { AccountDetailsData } from '@/types/components'
import { useLoading } from '@/context/LoadingContext'

// Initial state
const initialData: AccountDetailsData = {
  firstName: '',
  lastName: '',
  email: '',
  country: '',
  language: ''
}

const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const UserDropdown = () => {
  const { setValue } = useForm<AccountDetailsData>({
    defaultValues: initialData
  })

  const [open, setOpen] = useState(false)
  const { signOut } = useContext(AuthContext)
  const { getProfile, profile, isProfileLoaded } = useContext(DashboardContext)
  const { startLoading, stopLoading } = useLoading()
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const anchorRef = useRef<HTMLDivElement>(null)

  const handleDropdownOpen = () => {
    !open ? setOpen(true) : setOpen(false)
  }

  const handleDropdownCloseLogout = async (event?: MouseEvent<HTMLLIElement> | (MouseEvent | TouchEvent)) => {
    if (anchorRef.current && anchorRef.current.contains(event?.target as HTMLElement)) {
      return
    }

    setOpen(false)

    await signOut()
  }

  const handleDropdownClose = async (event?: MouseEvent<HTMLLIElement> | (MouseEvent | TouchEvent), url?: string) => {
    if (!isMounted) {
      return
    }

    try {
      if (url) {
        startLoading()

        router.push(url)

        await new Promise<void>(resolve => {
          const checkNavigation = () => {
            if (pathname === url) {
              resolve()
            }
          }

          const interval = setInterval(checkNavigation, 100)
          const timeout = setTimeout(() => clearInterval(interval), 5000)
        })

        stopLoading()
      }

      if (anchorRef.current?.contains(event?.target as HTMLElement)) {
        return
      }

      setOpen(false)
    } catch (error: unknown) {
      console.error('Error trying to navigate:', error)
      stopLoading()
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.error(`Error trying to navigate`)
    } finally {
      stopLoading()
    }
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isProfileLoaded) {
      const fetchProfile = async () => {
        try {
          await getProfile()
        } catch (error) {
          console.error('Failed to fetch profile:', error)
        }
      }

      fetchProfile()
    }
  }, [isProfileLoaded, getProfile])

  useEffect(() => {
    if (isProfileLoaded) {
      setValue('firstName', profile.firstName)
      setValue('lastName', profile.lastName)
      setValue('email', profile.email)
      setValue('country', profile.country)
      setValue('language', profile.language)
    }
  }, [isProfileLoaded, profile, setValue])

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap='circular'
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className='mis-2'
      >
        <Avatar
          ref={anchorRef}
          alt='John Doe'
          src='/images/avatars/1.png'
          onClick={handleDropdownOpen}
          className='cursor-pointer bs-[38px] is-[38px]'
        />
      </Badge>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-4 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper className='shadow-lg'>
              <ClickAwayListener onClickAway={e => handleDropdownClose(e as MouseEvent | TouchEvent)}>
                <MenuList>
                  <div className='flex items-center plb-2 pli-4 gap-2' tabIndex={-1}>
                    <Avatar alt='John Doe' src='/images/avatars/1.png' />
                    <div className='flex items-start flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        {profile.firstName} {profile.lastName}
                      </Typography>
                      <Typography variant='caption'>Admin</Typography>
                    </div>
                  </div>
                  <Divider className='mlb-1' />
                  <MenuItem className='gap-3' onClick={e => handleDropdownClose(e, '/my-profile')}>
                    <i className='ri-user-3-line' />
                    <Typography color='text.primary'>My Profile</Typography>
                  </MenuItem>
                  <MenuItem className='gap-3' onClick={() => window.location.assign('/under-construction')}>
                    <i className='ri-settings-4-line' />
                    <Typography color='text.primary'>Settings</Typography>
                  </MenuItem>
                  <div className='flex items-center plb-2 pli-4'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      size='small'
                      endIcon={<i className='ri-logout-box-r-line' />}
                      onClick={e => handleDropdownCloseLogout(e)}
                      sx={{ '& .MuiButton-endIcon': { marginInlineStart: 1.5 } }}
                    >
                      Logout
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default UserDropdown
