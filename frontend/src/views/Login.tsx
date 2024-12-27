'use client'

import { useState, useContext, useEffect } from 'react'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

import { useForm, Controller } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import type { Mode } from '@core/types'
import Illustrations from '@components/Illustrations'
import themeConfig from '@configs/themeConfig'
import { useImageVariant } from '@core/hooks/useImageVariant'
import { AuthContext } from '@/context/AuthContext'
import { useLoading } from '@/context/LoadingContext'
import type { AuthData } from '../types/components'

interface LoginFormInputs {
  email: string
  password: string
}

const Login = ({ mode }: { mode: Mode }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'

  const { signIn, setData, data } = useContext(AuthContext)
  const authBackground = useImageVariant(mode, lightImg, darkImg)
  const router = useRouter()
  const pathname = usePathname()
  const { startLoading, stopLoading } = useLoading()
  const [isMounted, setIsMounted] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<LoginFormInputs>()

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data: AuthData) => {
    setData(data)
  }

  const isDataValid = (data: AuthData) => {
    return Object.values(data).every(value => value !== '' && value !== null && value !== undefined)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const signInAndProceed = async () => {
      if (isDataValid(data)) {
        await signIn()
      }
    }

    signInAndProceed()
  }, [data])

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

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          <div className='flex flex-col gap-5'>
            <div>
              <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}!👋🏻`}</Typography>
              <Typography className='mbs-1'>Please sign-in to your account</Typography>
            </div>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
              <Controller
                name='email'
                control={control}
                defaultValue=''
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Enter a valid email'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoFocus
                    fullWidth
                    label='Email'
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name='password'
                control={control}
                defaultValue=''
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Password'
                    type={isPasswordShown ? 'text' : 'password'}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            size='small'
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={e => e.preventDefault()}
                          >
                            <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
              <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                <FormControlLabel control={<Checkbox />} label='Remember me' />
                <Typography
                  className='text-end'
                  color='primary'
                  component={Link}
                  href='/forgot-password'
                  onClick={e => {
                    e.preventDefault()
                    handleNavigation('/forgot-password')
                  }}
                >
                  Forgot password?
                </Typography>
              </div>
              <Button fullWidth variant='contained' type='submit'>
                Log In
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>New on our platform?</Typography>
                <Typography
                  component={Link}
                  href='/register'
                  color='primary'
                  onClick={e => {
                    e.preventDefault()
                    handleNavigation('/register')
                  }}
                >
                  Create an account
                </Typography>
              </div>
              <Divider className='gap-3'>or</Divider>
              <div className='flex justify-center items-center gap-2'>
                <IconButton size='small' className='text-facebook'>
                  <i className='ri-facebook-fill' />
                </IconButton>
                <IconButton size='small' className='text-twitter'>
                  <i className='ri-twitter-fill' />
                </IconButton>
                <IconButton size='small' className='text-github'>
                  <i className='ri-github-fill' />
                </IconButton>
                <IconButton size='small' className='text-googlePlus'>
                  <i className='ri-google-fill' />
                </IconButton>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
      <Illustrations maskImg={{ src: authBackground }} />
    </div>
  )
}

export default Login
