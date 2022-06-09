import { Chip, Link, Button } from '@mui/material'
import FaceIcon from "@mui/icons-material/Face"
import { useProvider } from '../states/useProvider'
import { useSigner } from '../states/useSigner'
import { useAccount } from '../states/useAccount'

export default function Account() {
  const provider = useProvider()
  const signer = useSigner(provider)
  const account = useAccount(provider, signer)

  const init = () => {
    const list: JSX.Element[] = []
    if (account?.address !== undefined) {
      list.push(<Chip key="user" color="primary" icon={<FaceIcon />} label={`...${account.address.slice(-3)}`} />)
    }
    if (account?.isAnswered === true) {
      list.push(<Chip key="isAnswered" color="primary" label="Answered" />)
    }
    if (account?.isMember === true) {
      list.push(<Chip key="isMember" color="primary" label="Member" />)
      list.push(<Link key="login" href="/member"><Button variant="contained">Login</Button></Link>)
    }
    return list
  }

  if (account !== undefined) return <div>{init()}</div>
  else return <div></div>
}