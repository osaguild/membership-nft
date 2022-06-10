import { ethers } from 'ethers'
import { useState, useEffect } from 'react'

export const useSigner = (provider: ethers.providers.Web3Provider | undefined) => {
    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | undefined>()
    useEffect(() => {
        setSigner(provider?.getSigner())
    }, [provider])
    return signer
}