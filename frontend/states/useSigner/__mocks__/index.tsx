import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'

export const useSigner = (provider: JsonRpcProvider | undefined) => {
    return provider?.getSigner()
}