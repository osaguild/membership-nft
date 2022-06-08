import { AppBar, Container, Toolbar, Box, Typography } from '@mui/material'
import Connect from './connect'
import Network from './network'
import Account from './account'

export default function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" component="div">
            MemberShipNFT
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Connect />
          <Network />
          <Account />
        </Toolbar>
      </Container>
    </AppBar>
  )
}