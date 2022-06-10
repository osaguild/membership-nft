import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers'
import { useState, useEffect } from 'react'

export const useSigner = (provider: Web3Provider | undefined) => {
    const [signer, setSigner] = useState<JsonRpcSigner | undefined>()
    useEffect(() => {
        setSigner(provider?.getSigner())
    }, [provider])
    return signer
}