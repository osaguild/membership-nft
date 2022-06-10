import { Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { useProvider } from '../../states/useProvider'
import { useNetwork } from '../../states/useNetwork'

export default function Network() {
  const provider = useProvider()
  const network = useNetwork(provider)

  const switchChain = async (event: SelectChangeEvent<any>) => {
    const chainId: ChainId = event.target.value
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${chainId.toString(16)}` }]
    })
  }

  if (network !== undefined) {
    return (
      <Select value={network.chainId} style={{ color: "white" }} size="small" onChange={switchChain}>
        <MenuItem value={1}>Ethereum</MenuItem>
        <MenuItem value={4}>Rinkby</MenuItem>
        <MenuItem value={137}>Matic</MenuItem>
      </Select>
    )
  } else return <div></div>
}