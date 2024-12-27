'use client'

import React, { useState, useEffect } from 'react'

import { Card, CardContent, Typography, Grid, LinearProgress, Box, Button } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import DownloadIcon from '@mui/icons-material/CloudDownload'

import AlertNotification from '../../components/AlertNotification' // Importe o componente de alerta

// Mock data (pode ser substituído pelos dados reais, caso necessário)
const initialReports = [
  { id: 1, name: 'Unvaccinated People Report', progress: 75 },
  { id: 2, name: 'Vaccinated People Report', progress: 45 },
  { id: 3, name: 'Comorbidities Report', progress: 100 }
]

const ExportProgressView = () => {
  const [reports, setReports] = useState(initialReports)
  const [alertMessage, setAlertMessage] = useState<string | null>(null)
  const [alertSeverity, setAlertSeverity] = useState<'info' | 'error'>('info')

  const removeCompletedReport = (id: number) => {
    setReports(reports.filter(report => report.id !== id))
  }

  const handleDownload = (name: string) => {
    setAlertSeverity('info')
    setAlertMessage(`Downloading ${name}...`)
    setTimeout(() => {
      setAlertMessage(null)
    }, 4000)
  }

  const handleRefresh = () => {
    setAlertSeverity('info')
    setAlertMessage('Refreshing export statuses...')
    setTimeout(() => {
      setAlertMessage(null)
    }, 4000)
  }

  useEffect(() => {
    const eventSource = new EventSource('/api/progress')

    eventSource.onmessage = event => {
      const progressData = JSON.parse(event.data) // Supondo que a resposta do SSE seja um número de progresso

      setReports(prevReports => {
        return prevReports.map(report =>
          report.id === progressData.id ? { ...report, progress: progressData.progress } : report
        )
      })
    }

    eventSource.onerror = () => {
      console.error('Error trying consume the SSE')
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
        gap: 2,
        maxWidth: 800,
        margin: 'auto'
      }}
    >
      <Typography variant='h4' gutterBottom>
        Export Progress
      </Typography>

      <AlertNotification message={alertMessage} severity={alertSeverity} onClose={() => setAlertMessage(null)} />

      <Grid container spacing={2}>
        {reports.map(report => (
          <Grid item xs={12} key={report.id}>
            <Card style={{ marginBottom: 10 }}>
              <CardContent>
                <Typography variant='h6'>{report.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, gap: 2, marginBottom: 5 }}>
                  <Box sx={{ flex: 1 }}>
                    <LinearProgress variant='determinate' value={report.progress} />
                  </Box>
                  <Typography variant='h6' sx={{ minWidth: 50 }}>
                    {report.progress}%
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, marginTop: 2 }}>
                  <Button
                    variant='outlined'
                    color={report.progress === 100 ? 'error' : 'secondary'}
                    size='small'
                    onClick={() => removeCompletedReport(report.id)}
                    disabled={report.progress !== 100}
                  >
                    Remove
                  </Button>
                  <Button
                    variant='contained'
                    startIcon={<DownloadIcon />}
                    size='small'
                    onClick={() => handleDownload(report.name)}
                  >
                    Download
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
        <Button variant='contained' startIcon={<RefreshIcon />} onClick={handleRefresh}>
          Refresh
        </Button>
      </Box>
    </Box>
  )
}

export default ExportProgressView
