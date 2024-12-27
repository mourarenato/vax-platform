'use client'

import { useState, useEffect, useContext } from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Grid,
  Checkbox
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

import AlertNotification from '@components/AlertNotification'
import { DashboardContext } from '@/context/DashboardContext'
import type { LengthAwarePaginatorVaccine } from '@/types/api'
import type { RegisterVaccineData, DefaultDeleteData } from '@/types/components'

const initialVaccineData: LengthAwarePaginatorVaccine = {
  current_page: 2,
  last_page: 3,
  per_page: 5,
  total: 12,
  data: []
}

const VaxCatalogForm = () => {
  const [pageVaccines, setPageVaccines] = useState<LengthAwarePaginatorVaccine>(initialVaccineData)
  const [selectedVaccines, setSelectedVaccines] = useState<Set<string>>(new Set())
  const [alertMessage, setAlertMessage] = useState<string | null>(null)
  const [alertSeverity, setAlertSeverity] = useState<'info' | 'error'>('info')

  const { getVaccines, vaccines, registerVaccine, deleteVaccines, setIsVaccinesLoaded, isVaccinesLoaded } =
    useContext(DashboardContext)

  const { control, handleSubmit, reset } = useForm<RegisterVaccineData>({
    defaultValues: { name: '', lot: '', expiryDate: '' }
  })

  const handleAddVaccine = async (data: RegisterVaccineData) => {
    setPageVaccines({
      ...pageVaccines,
      data: [...pageVaccines.data, data],
      total: pageVaccines.total + 1
    })
    setAlertSeverity('info')
    setAlertMessage('Addition of vaccine(s) is being processed...')

    await registerVaccine(data).then(() => reset())
    setTimeout(() => {
      setAlertMessage(null)
    }, 3000)
  }

  const handleSelectVaccine = (id: string) => {
    const newSelectedVaccines = new Set(selectedVaccines)

    if (newSelectedVaccines.has(id)) {
      newSelectedVaccines.delete(id)
    } else {
      newSelectedVaccines.add(id)
    }

    setSelectedVaccines(newSelectedVaccines)
  }

  const handleDeleteVaccines = async () => {
    setPageVaccines({
      ...pageVaccines,
      data: pageVaccines.data.filter(pageVaccines => !selectedVaccines.has(pageVaccines.id)),
      total: pageVaccines.total - selectedVaccines.size
    })
    setSelectedVaccines(new Set())

    setAlertSeverity('info')
    setAlertMessage('Vaccine deletion is being processed...')

    await deleteVaccines({ ids: [...selectedVaccines] })

    setTimeout(() => {
      setAlertMessage(null)
    }, 3000)
  }

  const isDeleteButtonActive = selectedVaccines.size > 0

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pageVaccines.last_page) {
      const fetchVaccines = async () => {
        await getVaccines(newPage)
      }

      fetchVaccines()

      setPageVaccines(prevVaccines => ({
        ...prevVaccines,
        current_page: newPage,
        data: pageVaccines.data
      }))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (vaccines.data.length === 0 && !isVaccinesLoaded) {
        await getVaccines()
      }
    }

    fetchData()
  }, [getVaccines, isVaccinesLoaded, vaccines.data])

  useEffect(() => {
    if (vaccines.data.length > 0) {
      setPageVaccines(vaccines)
    }
  }, [vaccines])

  return (
    <Card>
      <CardHeader title='Vaccine Catalog' />
      <CardContent>
        <AlertNotification message={alertMessage} severity={alertSeverity} onClose={() => setAlertMessage(null)} />

        <form onSubmit={handleSubmit(handleAddVaccine)}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
              <Controller
                name='name'
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Vaccine Name'
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='lot'
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Lot'
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='expiryDate'
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='date'
                    label='Expiry Date'
                    InputLabelProps={{ shrink: true }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} className='flex gap-4 flex-wrap' marginTop={2}>
              <Button variant='contained' type='submit'>
                Add Vaccine
              </Button>

              <Button
                variant='outlined'
                onClick={handleDeleteVaccines}
                disabled={!isDeleteButtonActive}
                color={isDeleteButtonActive ? 'error' : 'secondary'}
              >
                Delete Selected
              </Button>
            </Grid>
          </Grid>
        </form>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 50, textAlign: 'center' }} />
                <TableCell sx={{ textAlign: 'center' }}>Name</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Lot</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Expiry Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageVaccines.data.map(vaccine => (
                <TableRow key={vaccine.id}>
                  <TableCell sx={{ width: 50, textAlign: 'center', padding: '2px' }}>
                    <Checkbox
                      checked={selectedVaccines.has(vaccine.id)}
                      onChange={() => handleSelectVaccine(vaccine.id)}
                      sx={{ padding: 0 }}
                    />
                  </TableCell>
                  <TableCell sx={{ display: 'none' }}>{vaccine.id}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{vaccine.name}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{vaccine.lot}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{vaccine.expiry_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container spacing={3} justifyContent='space-between' alignItems='center' marginTop={2}>
          <Grid item>
            <Button
              onClick={() => handlePageChange(pageVaccines.current_page - 1)}
              disabled={pageVaccines.current_page === 1}
            >
              Prev
            </Button>
          </Grid>
          <Grid item>{`Page ${pageVaccines.current_page} of ${pageVaccines.last_page}`}</Grid>
          <Grid item>
            <Button
              onClick={() => handlePageChange(pageVaccines.current_page + 1)}
              disabled={pageVaccines.current_page === pageVaccines.last_page}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default VaxCatalogForm
