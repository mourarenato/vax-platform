// MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

interface CardProps {
  image: string
  title: string
  description: string
}

const CardInfluencingInfluencerWithImg: React.FC<CardProps> = ({ image, title, description }) => {
  return (
    <Card>
      <CardMedia image={image} className='bs-[200px]' />
      <CardContent>
        <Typography variant='h5' className='mbe-2'>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardInfluencingInfluencerWithImg
