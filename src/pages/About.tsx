import { useNavigate } from 'react-router-dom'
import { Container, Button, Typography } from '@mui/material'

export const About: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Container maxWidth="md" sx={{ height: 'calc(100vh-68px)'}}>
      <Typography>MoviesApp v0.1.0</Typography>
      <Button
        type="button"
        cy-data="go-back-button"
        onClick={() => navigate('/')}
      >
        Back
      </Button>
    </Container>
  )
}
