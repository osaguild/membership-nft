import { connectWallet, switchNetwork, getNetwork } from "../lib/web3"
import { Button, Select, MenuItem, SelectChangeEvent } from "@mui/material"

export default function Wallet(props: any) {

  const connect = async () => {
    const account = await connectWallet()
    if (typeof account === "string") props.setAccount(account)
  }

  const handleChange = async (event: SelectChangeEvent<any>) => {
    if (await switchNetwork(event.target.value)) props.setNetwork(await getNetwork())
  }

  if (props.account === undefined) {
    return (
      <Button variant="contained" onClick={connect}>
        Connect Wallet
      </Button>
    )
  } else {
    return (
      <Select value={props.network.chainId} onChange={handleChange}>
        <MenuItem value={1}>Ethereum</MenuItem>
        <MenuItem value={4}>Rinkby</MenuItem>
        <MenuItem value={137}>Matic</MenuItem>
      </Select>
    )
  }
}