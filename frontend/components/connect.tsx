import { Button } from '@mui/material'
import { useProvider } from '../states/useProvider'
import { useSigner } from '../states/useSigner'
import { useAccount } from '../states/useAccount'

export default function Connect() {
    const provider = useProvider()
    const signer = useSigner(provider)
    const account = useAccount(provider, signer)

    const connectWallet = async () => {
        if (provider === undefined) return
        await provider.send("eth_requestAccounts", [])
    }

    if (account === undefined) {
        return (
            <Button variant="contained" onClick={connectWallet}>
                Connect Wallet
            </Button>
        )
    } else return <div></div>
}