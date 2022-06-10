import { ethers } from 'ethers'
import { useState, useEffect } from 'react'

export const useNetwork = (provider: ethers.providers.Web3Provider | undefined) => {
    const [network, setNetwork] = useState<ethers.providers.Network | undefined>()

    useEffect(() => {
        // check chaninChange event
        window.ethereum.on("chainChanged", (chainId: any) => {
            window.location.reload()
        })
        provider?.getNetwork().then(setNetwork)
    }, [provider])
    
    return network
}