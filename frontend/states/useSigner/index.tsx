import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { useState, useEffect } from 'react'

export const useSigner = (provider: JsonRpcProvider | undefined) => {
    const [signer, setSigner] = useState<JsonRpcSigner | undefined>()
    useEffect(() => {
        setSigner(provider?.getSigner())
    }, [provider])
    return signer
}