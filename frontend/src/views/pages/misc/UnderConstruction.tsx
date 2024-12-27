'use client'

import Link from 'next/link'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import type { Mode } from '@core/types'

import Illustrations from '@components/Illustrations'

import { useImageVariant } from '@core/hooks/useImageVariant'

const UnderConstruction = ({ mode }: { mode: Mode }) => {
  const darkImg = '/images/pages/misc-mask-dark.png'
  const lightImg = '/images/pages/misc-mask-light.png'

  const miscBackground = useImageVariant(mode, lightImg, darkImg)

  return (
    <div className='flex is-full min-bs-full flex-auto flex-col' dir='ltr'>
      <div className='flex items-center justify-center min-bs-[100dvh] relative p-6 overflow-x-hidden'>
        <div className='flex items-center flex-col text-center gap-10'>
          <div className='flex flex-col gap-2 is-[90vw] sm:is-[unset]'>
            <Typography variant='h4'>Under Construction! 🛠️</Typography>
            <Typography>This page is currently under construction. Please check back soon for updates!</Typography>
          </div>
          <img
            alt='error-illustration'
            src='/images/illustrations/characters/6.png'
            className='object-cover bs-[400px] md:bs-[450px] lg:bs-[500px]'
          />
          <Button href='/' component={Link} variant='contained'>
            Back to Home
          </Button>
        </div>
        <Illustrations maskImg={{ src: miscBackground }} />
        <Illustrations maskImg={{ src: lightImg }} />
      </div>
    </div>
  )
}

export default UnderConstruction
