import { ethers } from 'ethers'
import { useState, useEffect } from 'react'

export const useNetwork = (provider: ethers.providers.Web3Provider | undefined) => {
    const [network, setNetwork] = useState<ethers.providers.Network | undefined>()
    useEffect(() => {
        provider?.getNetwork().then(setNetwork)
    }, [provider])
    return network
}