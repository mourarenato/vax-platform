'use client'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import CardInfluencingInfluencerWithImg from '@/views/dashboard/CardInfluencingInfluencerWithImg'
import CardWithCollapse from '@/views/dashboard/CardWithCollapse'

const HomePage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h3'>COVID News</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardWithCollapse
          image='/images/cards/4.png'
          title='1 in 5 adults with Long COVID struggle with daily activities'
          description='Millions of American adults are struggling with Long COVID, and a fifth have symptoms so debilitating 
          they interfere with daily activities, a new report finds.'
          details='"Frequently reported symptoms include fatigue that 
          interferes with daily life, difficulty thinking or concentrating, cough and heart palpitations," explained a team 
          of researchers at the U.S. Centers for Disease Control and Prevention.'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardInfluencingInfluencerWithImg
          image='/images/cards/2.png'
          title='How Many Lives Were Lost to COVID-19? A Look Back Nearly 5 Years Later'
          description='Deaths from COVID-19 have slowed significantly but continue adding to a tally of more than 7 million deaths from the virus 
          in the nearly five years since the World Health Organization (WHO) declared a pandemic.'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardInfluencingInfluencerWithImg
          image='/images/cards/1.png'
          title='Journal pulls scientific paper that popularized hydroxychloroquine as COVID-19 treatment'
          description='The paper, published in 2020 in the International Journal of Antimicrobial Agents, originally claimed that treatments with 
          hydroxychloroquine, an anti-malaria drug, reduced virus levels in COVID patients and was more effective if used alongside an antibiotic, 
          known as azithromycin.'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardInfluencingInfluencerWithImg
          image='/images/cards/6.png'
          title='Pediatric investigation study confirms the safety of COVID-19 vaccination during pregnancy'
          description='The study, conducted in the Netherlands, shows that maternal COVID-19 vaccination is not associated with adverse health outcomes in infants.'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardWithCollapse
          image='/images/cards/3.png'
          title='COVID for Christmas? Where cases stand in Nashville and latest COVID-19 symptoms'
          description='A new COVID-19 variant has overtaken KP.3.1.1 as the leading variant in the United States. Meanwhile, 
          COVID cases in the Davidson County area are on the decline.'
          details='Up until the two-week period ending on Nov. 23, the KP.3.1.1 variant was the leading COVID variant in the country, accounting for 47% of cases according 
          to data from the Centers for Disease Control and Prevention. Then, during the two week period ending on Dec. 7, the XEC variant overtook KP.3.1.1, accounting for 44% of total cases. 
          The XEC variant first appeared in Germany in June.'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardInfluencingInfluencerWithImg
          image='/images/cards/5.png'
          title='Combination Influenza and COVID-19 Vaccine Candidates Granted Fast Track Designation'
          description='The FDA recently granted Fast Track designation to the first non-mRNA combination vaccine candidates of vaccines that have already been licensed to prevent the respiratory 
          diseases influenza and COVID-19 among individuals 50 years and older'
        />
      </Grid>
    </Grid>
  )
}

export default HomePage
