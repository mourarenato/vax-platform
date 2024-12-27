'use client'

// React Imports
import { useState } from 'react'
import type { ChangeEvent } from 'react'

// MUI Imports
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
import InputAdornment from '@mui/material/InputAdornment'

type Data = {
  cpf: string
  fullName: string
  birthDate: string
  firstDoseDate: string
  secondDoseDate: string
  thirdDoseDate: string
  vaccineApplied: string
  hasComorbidity: boolean
}

// Vars
const initialData: Data = {
  cpf: '',
  fullName: '',
  birthDate: '',
  firstDoseDate: '',
  secondDoseDate: '',
  thirdDoseDate: '',
  vaccineApplied: '',
  hasComorbidity: false
}

const vaccineData = ['Vaccine 1', 'Vaccine 2', 'Vaccine 3']

const FormLayoutsWithIcon = () => {
  // States
  const [formData, setFormData] = useState<Data>(initialData)

  const handleFormChange = (field: keyof Data, value: Data[keyof Data]) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <Card>
      <CardHeader title='Account Details' />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='CPF'
                value={formData.cpf}
                placeholder='123.456.789-00'
                onChange={e => handleFormChange('cpf', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='ri-user-3-line' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Full Name'
                value={formData.fullName}
                placeholder='John Doe'
                onChange={e => handleFormChange('fullName', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='ri-user-3-line' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='date'
                label='Date of Birth'
                value={formData.birthDate}
                onChange={e => handleFormChange('birthDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='date'
                label='First Dose Date'
                value={formData.firstDoseDate}
                onChange={e => handleFormChange('firstDoseDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='date'
                label='Second Dose Date'
                value={formData.secondDoseDate}
                onChange={e => handleFormChange('secondDoseDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='date'
                label='Third Dose Date'
                value={formData.thirdDoseDate}
                onChange={e => handleFormChange('thirdDoseDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Vaccine Applied</InputLabel>
                <Select
                  label='Vaccine Applied'
                  value={formData.vaccineApplied}
                  onChange={e => handleFormChange('vaccineApplied', e.target.value)}
                >
                  {vaccineData.map(vaccine => (
                    <MenuItem key={vaccine} value={vaccine}>
                      {vaccine}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.hasComorbidity}
                    onChange={e => handleFormChange('hasComorbidity', e.target.checked)}
                  />
                }
                label='Has comorbidity?'
              />
            </Grid>
            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit'>
                Save Changes
              </Button>
              <Button variant='outlined' type='reset' color='secondary' onClick={() => setFormData(initialData)}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsWithIcon
