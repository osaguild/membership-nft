import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Wallet from './wallet'
import Account from './account'
import Login from './login'

export default function Header(props: any) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" component="div">
            MemberShipNFT
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Wallet account={props.account} network={props.network} />
          <Account account={props.account} isAnswered={props.isAnswered} isMember={props.isMember} />
          <Login isMember={props.isMember} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}