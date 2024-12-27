'use client'

import React, { useState, useEffect, useContext } from 'react'

import { useForm, Controller } from 'react-hook-form'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { cpf } from 'cpf-cnpj-validator'

import { DashboardContext } from '@/context/DashboardContext'
import type { RegisterVaxxedPeopleData, DefaultDeleteData } from '@/types/components'
import type { LengthAwarePaginatorVaxxedPeople, VaccineApiData, LengthAwarePaginatorVaccine } from '@/types/api'
import AlertNotification from '../../../components/AlertNotification'

// Mocked data to simulate the LengthAwarePaginator
const initialVaxxedPersonData: LengthAwarePaginatorVaxxedPeople = {
  current_page: 1,
  last_page: 3,
  per_page: 5,
  total: 12,
  data: []
}

const initialVaccinesData: LengthAwarePaginatorVaccine = {
  current_page: 1,
  last_page: 3,
  per_page: 5,
  total: 12,
  data: []
}

const PageVaxxedPersonForm = () => {
  const [pageVaxxedPerson, setPageVaxxedPerson] = useState<LengthAwarePaginatorVaxxedPeople>(initialVaxxedPersonData)
  const [pageVaccines, setPageVaccines] = useState<LengthAwarePaginatorVaccine>(initialVaccinesData)
  const [selectedVaxxedPerson, setSelectedVaxxedPerson] = useState<Set<string>>(new Set())
  const [alertMessage, setAlertMessage] = useState<string | null>(null)
  const [selectedVaccineId, setSelectedVaccineId] = useState<number | null>(null)
  const [alertSeverity, setAlertSeverity] = useState<'info' | 'error'>('info')

  const {
    getVaccines,
    getVaxxedPeople,
    vaxxedPeople,
    registerVaxedPerson,
    deleteVaxxedPeople,
    vaccines,
    isVaxxedPeopleLoaded,
    isVaccinesLoaded
  } = useContext(DashboardContext)

  const { control, handleSubmit, reset, errors } = useForm<RegisterVaxxedPeopleData>({
    defaultValues: {
      id: '',
      cpf: '',
      fullName: '',
      birthDate: '',
      firstDose: '',
      secondDose: '',
      thirdDose: '',
      vaccineId: null,
      vaccineApplied: '',
      hasComorbidity: 0
    }
  })

  const handleAddVaxxedPerson = async (data: RegisterVaxxedPeopleData) => {
    data.vaccineId = selectedVaccineId

    if (!data.vaccineApplied) {
      data.vaccineApplied = 'No'
    }

    setPageVaxxedPerson({
      ...pageVaxxedPerson,
      data: [...pageVaxxedPerson.data, data],
      total: pageVaxxedPerson.total + 1
    })
    setAlertSeverity('info')
    setAlertMessage('Addition of record(s) is being processed...')

    await registerVaxedPerson(data).then(() => reset())
    setTimeout(() => {
      setAlertMessage(null)
    }, 3000)
  }

  const handleSelectVaxxedPerson = (id: string) => {
    const newSelectedVaxxedPerson = new Set(selectedVaxxedPerson)

    if (newSelectedVaxxedPerson.has(id)) {
      newSelectedVaxxedPerson.delete(id)
    } else {
      newSelectedVaxxedPerson.add(id)
    }

    setSelectedVaxxedPerson(newSelectedVaxxedPerson)
  }

  const handleDeleteVaxxedPerson = async () => {
    setPageVaxxedPerson({
      ...pageVaxxedPerson,
      data: pageVaxxedPerson.data.filter(pageVaxxedPerson => !selectedVaxxedPerson.has(pageVaxxedPerson.id)),
      total: pageVaxxedPerson.total - selectedVaxxedPerson.size
    })
    setSelectedVaxxedPerson(new Set())
    console.log(selectedVaxxedPerson)

    setAlertSeverity('info')
    setAlertMessage('Record deletion is being processed...')

    await deleteVaxxedPeople({ ids: [...selectedVaxxedPerson] })
    setTimeout(() => {
      setAlertMessage(null)
    }, 3000)
  }

  const isDeleteButtonActive = selectedVaxxedPerson.size > 0

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pageVaxxedPerson.last_page) {
      const fetchData = async () => {
        await getVaxxedPeople(newPage)
        await getVaccines(newPage)
      }

      fetchData()

      setPageVaxxedPerson(prevVaxxedPeople => ({
        ...prevVaxxedPeople,
        current_page: newPage,
        data: pageVaxxedPerson.data
      }))
      setPageVaccines(prevVaccines => ({
        ...prevVaccines,
        current_page: newPage,
        data: pageVaccines.data
      }))
    }
  }

  useEffect(() => {
    if (vaxxedPeople.data.length === 0 && !isVaxxedPeopleLoaded) {
      const fetchData = async () => {
        await getVaxxedPeople()
      }

      fetchData()
    }
  }, [getVaxxedPeople, vaxxedPeople.data.length, isVaxxedPeopleLoaded])

  useEffect(() => {
    const fetchData = async () => {
      if (vaccines.data.length === 0 && !isVaccinesLoaded) {
        await getVaccines()
      }
    }

    fetchData()
  }, [getVaccines, isVaccinesLoaded, vaccines.data])

  useEffect(() => {
    if (vaxxedPeople.data.length > 0) {
      setPageVaxxedPerson(vaxxedPeople)
    }
  }, [vaxxedPeople])

  useEffect(() => {
    if (vaccines.data.length > 0) {
      setPageVaccines(vaccines)
    }
  }, [vaccines])

  /*   const handleExportCSV = async () => {
    try {
      // Filtra pessoas não vacinadas
      const nonVaccinated = people.filter(person => person.vaccineApplied === 'No')

      // Simula uma chamada ao backend
      const response = await fetch('/api/export-non-vaccinated', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: nonVaccinated })
      })

      if (!response.ok) {
        throw new Error('Failed to export CSV')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'non_vaccinated_report.csv'
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      alert('Failed to export CSV: ' + error.message)
    }
  } */

  return (
    <Card>
      <CardHeader title='Vaccination Records' />
      <AlertNotification message={alertMessage} severity={alertSeverity} onClose={() => setAlertMessage(null)} />
      <CardContent>
        <form onSubmit={handleSubmit(handleAddVaxxedPerson)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='cpf'
                control={control}
                rules={{
                  required: 'CPF is required',
                  validate: value => cpf.isValid(value) || 'Please enter a valid CPF'
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='CPF'
                    placeholder='123.456.789-00'
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='fullName'
                control={control}
                rules={{ required: 'Full Name is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Full Name'
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='birthDate'
                control={control}
                rules={{ required: 'Birth Date is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='date'
                    label='Date of Birth'
                    InputLabelProps={{ shrink: true }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='firstDoseDate'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='date'
                    label='First Dose Date'
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='secondDoseDate'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='date'
                    label='Second Dose Date'
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='thirdDoseDate'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='date'
                    label='Third Dose Date'
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='vaccineApplied'
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth variant='outlined'>
                    <InputLabel>Vaccine Applied</InputLabel>
                    <Select
                      {...field}
                      value={field.value || 'No'}
                      label='Vaccine Applied'
                      onChange={e => {
                        const vaccineId = e.target.value as unknown as number

                        if (vaccineId) {
                          field.onChange(vaccineId)
                        } else {
                          field.onChange(null)
                        }
                      }}
                    >
                      <MenuItem value='No'>No</MenuItem>
                      {pageVaccines.data &&
                        pageVaccines.data.map((vaccine: VaccineApiData) => (
                          <MenuItem key={vaccine.id} value={vaccine.name}>
                            {vaccine.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='hasComorbidity'
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked ? 1 : 0)}
                      />
                    }
                    label='Has Comorbidity?'
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit'>
                Add Register
              </Button>
              <Button
                variant='outlined'
                onClick={handleDeleteVaxxedPerson}
                disabled={!isDeleteButtonActive}
                color={isDeleteButtonActive ? 'error' : 'secondary'}
              >
                Delete Selected
              </Button>
            </Grid>
          </Grid>
        </form>
        <TableContainer style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Birth Date</TableCell>
                <TableCell>First Dose</TableCell>
                <TableCell>Second Dose</TableCell>
                <TableCell>Third Dose</TableCell>
                <TableCell>Vaccine</TableCell>
                <TableCell>Comorbidity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageVaxxedPerson.data.map(pageVaxxedPerson => (
                <TableRow key={pageVaxxedPerson.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedVaxxedPerson.has(pageVaxxedPerson.id)}
                      onChange={() => handleSelectVaxxedPerson(pageVaxxedPerson.id)}
                      sx={{ padding: 0 }}
                    />
                  </TableCell>
                  <TableCell>{pageVaxxedPerson.cpf}</TableCell>
                  <TableCell>{pageVaxxedPerson.full_name}</TableCell>
                  <TableCell>{pageVaxxedPerson.birthdate}</TableCell>
                  <TableCell>{pageVaxxedPerson.first_dose}</TableCell>
                  <TableCell>{pageVaxxedPerson.second_dose}</TableCell>
                  <TableCell>{pageVaxxedPerson.third_dose}</TableCell>
                  <TableCell>{pageVaxxedPerson.vaccine_applied}</TableCell>
                  <TableCell>{pageVaxxedPerson.has_comorbidity ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={3} justifyContent='space-between' alignItems='center' marginTop={2}>
          <Grid item>
            <Button
              onClick={() => handlePageChange(pageVaxxedPerson.current_page - 1)}
              disabled={pageVaxxedPerson.current_page === 1}
            >
              Prev
            </Button>
          </Grid>
          <Grid item>{`Page ${pageVaxxedPerson.current_page} of ${pageVaxxedPerson.last_page}`}</Grid>
          <Grid item>
            <Button
              onClick={() => handlePageChange(pageVaxxedPerson.current_page + 1)}
              disabled={pageVaxxedPerson.current_page === pageVaxxedPerson.last_page}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PageVaxxedPersonForm
