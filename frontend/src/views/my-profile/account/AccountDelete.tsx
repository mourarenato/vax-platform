'use client'

import { useContext, useState } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import type { SubmitHandler } from 'react-hook-form'
import { useForm, Controller } from 'react-hook-form'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'
import { toast } from 'react-toastify'

import Typography from '@mui/material/Typography'

import { AuthContext } from '@/context/AuthContext'
import type { AuthData } from '@/types/components'
import { DashboardContext } from '@/context/DashboardContext'

interface AccountDetailsData {
  confirmDeletion: boolean
}

const AccountDelete = () => {
  const { deleteProfile } = useContext(DashboardContext)
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<AccountDetailsData>({
    defaultValues: {
      confirmDeletion: false
    }
  })

  const onSubmit: SubmitHandler<AccountDetailsData> = (data: AccountDetailsData) => {
    if (data.confirmDeletion) {
      toast.info(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p style={{ fontSize: '16px' }}>Are you sure you want to delete?</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={async () => {
                try {
                  await deleteProfile()
                } catch (error) {
                  console.error('Error:', error)
                }
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f44336',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss()}
              style={{
                padding: '8px 16px',
                backgroundColor: '#9e9e9e',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Cancel
            </button>
          </div>
        </div>,
        {
          position: 'top-center',
          autoClose: false,
          closeOnClick: false,
          draggable: false
        }
      )
    }
  }

  return (
    <>
      <Backdrop open={loading} style={{ zIndex: 1300, color: '#fff' }}>
        <CircularProgress color='inherit' />
      </Backdrop>

      <Card>
        <CardHeader title='Delete Account' />
        <CardContent className='flex flex-col items-start gap-6'>
          <Controller
            name='confirmDeletion'
            control={control}
            rules={{ required: 'You need to confirm your decision' }}
            render={({ field }) => (
              <FormControlLabel control={<Checkbox {...field} />} label='I confirm the deletion of my account' />
            )}
          />
          {errors.confirmDeletion && <Typography color='error'>{errors.confirmDeletion.message}</Typography>}
          <Button variant='contained' color='error' onClick={handleSubmit(onSubmit)} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Account'}
          </Button>
        </CardContent>
      </Card>
    </>
  )
}

export default AccountDelete
