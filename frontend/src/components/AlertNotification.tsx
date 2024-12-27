'use client'

import React from 'react'

import { Alert, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface AlertNotificationProps {
  message: string | null
  severity: 'info' | 'error'
  onClose: () => void
}

const AlertNotification: React.FC<AlertNotificationProps> = ({ message, severity, onClose }) => {
  if (!message) return null

  return (
    <Alert
      severity={severity}
      sx={{ width: '100%', marginBottom: 2 }}
      action={
        <IconButton color='inherit' size='small' onClick={onClose}>
          <CloseIcon fontSize='small' />
        </IconButton>
      }
    >
      {message}
    </Alert>
  )
}

export default AlertNotification
