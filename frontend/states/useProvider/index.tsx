import { Web3Provider } from '@ethersproject/providers'
import { useEffect, useState } from 'react'

export const useProvider = (): Web3Provider | undefined => {
    const [provider, setProvider] = useState<Web3Provider | undefined>()
    useEffect(() => {
        setProvider(new Web3Provider(window.ethereum))
    }, [])
    return provider
}