import { connectWallet } from "../lib/web3"
import Button from "@mui/material/Button"

export default function Wallet(props: any) {

  const connect = async () => {
    const account = await connectWallet()
    if (account === undefined) return
    else props.setAccount(account)
  }

  if (props.account === undefined) {
    return (
      <Button variant="contained" onClick={connect}>
        Connect Wallet
      </Button>
    )
  } else {
    return (
      <div>
        <Button variant="contained">
          Connected
        </Button>
        {props.account}
      </div>
    )
  }
}