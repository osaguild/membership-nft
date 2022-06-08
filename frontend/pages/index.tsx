import { Container } from '@mui/material'
import Header from '../components/header'
import Questions from '../components/form'
import Footer from '../components/footer'

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