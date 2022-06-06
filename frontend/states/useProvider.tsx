import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

export const useProvider = (): ethers.providers.Web3Provider | undefined => {
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined>()
    useEffect(() => {
        setProvider(new ethers.providers.Web3Provider(window.ethereum))
    }, [])
    return provider
}