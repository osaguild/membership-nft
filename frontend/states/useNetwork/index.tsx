import { Web3Provider, Network } from '@ethersproject/providers'
import { useState, useEffect } from 'react'

export const useNetwork = (provider: Web3Provider | undefined) => {
    const [network, setNetwork] = useState<Network | undefined>()

    useEffect(() => {
        // check chaninChange event
        window.ethereum.on("chainChanged", (chainId: any) => {
            window.location.reload()
        })
        provider?.getNetwork().then(setNetwork)
    }, [provider])

    return network
}