import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

export const useAccount = (signer: ethers.providers.JsonRpcSigner | undefined) => {
    const [address, setAddress] = useState<string | undefined>()
    useEffect(() => {
        signer?.getAddress().then(setAddress)
    }, [signer])
    return address
}