'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'

interface CardWithCollapseProps {
  image: string
  title: string
  description: string
  details: string
}

const CardWithCollapse: React.FC<CardWithCollapseProps> = ({ image, title, description, details }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card>
      <CardMedia image={image} className='bs-[185px]' />
      <CardContent>
        <Typography variant='h5' className='mbe-3'>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions className='justify-between card-actions-dense'>
        <Button onClick={() => setExpanded(!expanded)}>Details</Button>
        <IconButton onClick={() => setExpanded(!expanded)}>
          <i className={expanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout={300}>
        <Divider />
        <CardContent>
          <Typography>{details}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default CardWithCollapse
