import { connectWallet, switchNetwork } from "../lib/web3"
import { Button, Select, MenuItem, SelectChangeEvent } from "@mui/material"

export default function Wallet(props: any) {

  const connect = async () => {
    await connectWallet()
  }

  const handleChange = async (event: SelectChangeEvent<any>) => {
    await switchNetwork(event.target.value)
  }

  if (props.account === undefined) {
    return (
      <Button variant="contained" onClick={connect}>
        Connect Wallet
      </Button>
    )
  } else {
    return (
      <Select value={props.network.chainId} style={{ color: "white" }} onChange={handleChange}>
        <MenuItem value={1}>Ethereum</MenuItem>
        <MenuItem value={4}>Rinkby</MenuItem>
        <MenuItem value={137}>Matic</MenuItem>
      </Select>
    )
  }
}