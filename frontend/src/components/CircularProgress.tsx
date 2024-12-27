import { CircularProgress, Box, Typography } from '@mui/material'

interface LoadingComponentProps {
  message?: string // Mensagem opcional para exibir junto com o loading
  fullScreen?: boolean // Permite usar o loading em tela cheia ou como um container flexível
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({
  message = 'Loading...', // Mensagem padrão
  fullScreen = true // Por padrão, ocupa a tela inteira
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: fullScreen ? '100vh' : '100%',
        width: '100%',
        backgroundColor: fullScreen ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
        position: fullScreen ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        zIndex: fullScreen ? 1300 : 'auto'
      }}
    >
      <CircularProgress color='primary' />
      {message && (
        <Typography variant='body1' sx={{ marginTop: 2, color: 'text.secondary', fontWeight: 'bold' }}>
          {message}
        </Typography>
      )}
    </Box>
  )
}

export default LoadingComponent
