'use client'

import { useState, useEffect, useContext } from 'react'

import { useForm, Controller } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { DashboardContext } from '@/context/DashboardContext'
import type { AccountDetailsData, AuthData } from '@/types/components'

// Initial state
const initialData: AccountDetailsData = {
  firstName: '',
  lastName: '',
  email: '',
  country: '',
  language: ''
}

interface PageAuthData {
  name?: string
  email: string
  password: string
  details?: any
}

interface DetailsData {
  firstName: string
  lastName: string
  country: string
  language: string
}

const languageData = ['English', 'French', 'German', 'Portuguese', 'Spanish']

const AccountDetails = () => {
  const { control, handleSubmit, reset, setValue } = useForm<AccountDetailsData>({
    defaultValues: initialData
  })

  // const [fileInput, setFileInput] = useState<string>('')
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [loading, setLoading] = useState(true)
  const { getProfile, profile, updateProfile, isProfileLoaded } = useContext(DashboardContext)

  const onSubmit: SubmitHandler<AccountDetailsData> = async (data: AccountDetailsData) => {
    data.country = data.country || 'USA'
    data.language = data.language || 'English'
    await updateProfile(data)
  }

  //Upload photo
  /*   const handleFileInputChange = (file: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    const { files } = file.target

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setFileInput(reader.result as string)
      }
    }
  } */

  /*   const handleFileInputReset = () => {
    setFileInput('')
    setImgSrc('/images/avatars/1.png')
  } */

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
    <Card>
      <CardContent className='mbe-5'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button component='label' size='small' variant='contained' htmlFor='account-settings-upload-image'>
                Upload New Photo
                {/*<input
                  hidden
                  type='file'
                  value={fileInput}
                  accept='image/png, image/jpeg'
                  onChange={handleFileInputChange}
                  id='account-settings-upload-image'
                /> */}
              </Button>
              <Button size='small' variant='outlined' color='error'>
                Reset
              </Button>
            </div>
            <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='firstName'
                control={control}
                rules={{ required: 'First Name is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='First Name'
                    placeholder='First Name'
                    error={!!fieldState?.error}
                    helperText={fieldState?.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='lastName'
                control={control}
                rules={{ required: 'Last Name is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Last Name'
                    placeholder='Last Name'
                    error={!!fieldState?.error}
                    helperText={fieldState?.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='email'
                control={control}
                rules={{ required: 'Email is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Email'
                    placeholder='myemail@email.com'
                    error={!!fieldState?.error}
                    helperText={fieldState?.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Controller
                  name='country'
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label='Country' value={field.value || 'USA'}>
                      <MenuItem value='Argentina'>Argentina</MenuItem>
                      <MenuItem value='Australia'>Australia</MenuItem>
                      <MenuItem value='Brazil'>Brazil</MenuItem>
                      <MenuItem value='France'>France</MenuItem>
                      <MenuItem value='Germany'>Germany</MenuItem>
                      <MenuItem value='Spain'>Spain</MenuItem>
                      <MenuItem value='UK'>UK</MenuItem>
                      <MenuItem value='USA'>USA</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Controller
                  name='language'
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label='Language' value={field.value || 'English'} required>
                      {languageData.map(name => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit'>
                Save Changes
              </Button>
              <Button variant='outlined' type='reset' color='secondary' onClick={() => reset(initialData)}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AccountDetails
