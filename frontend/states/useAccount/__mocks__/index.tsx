import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { config } from '../../../config'

export const useAccount = (
    provider: JsonRpcProvider | undefined,
    signer: JsonRpcSigner | undefined,
) => {
    return { address: config.TEST_USER_ADDRESS, isAnswered: true, isMember: true }
}
