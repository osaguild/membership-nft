import { JsonRpcProvider } from '@ethersproject/providers'

export const useProvider = (): JsonRpcProvider | undefined => {
    return new JsonRpcProvider('rinkeby')
}