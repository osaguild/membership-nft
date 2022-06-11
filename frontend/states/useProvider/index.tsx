import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers'
import { useEffect, useState } from 'react'

export const useProvider = (): JsonRpcProvider | undefined => {
    const [provider, setProvider] = useState<JsonRpcProvider | undefined>()
    useEffect(() => {
        setProvider(new Web3Provider(window.ethereum))
    }, [])
    return provider
}