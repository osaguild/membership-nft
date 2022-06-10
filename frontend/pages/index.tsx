import { Container } from '@mui/material'
import Header from '../components/Header'
import Questions from '../components/Form'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
      <Header />
      <Container sx={{ p: 5 }} maxWidth="xl" >
        <Questions />
      </Container >
      <Footer />
    </div>
  )
}