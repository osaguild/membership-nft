import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { config } from "../../config"
import { SignatureLike } from '@ethersproject/bytes'

export const useToken = (
    signer: ethers.providers.JsonRpcSigner | undefined,
    account: Account | undefined,
    network: ethers.providers.Network | undefined,
    signature: SignatureLike | undefined,
) => {
    const [token, setToken] = useState<Token | undefined>()

    const authN = async () => {
        if (signer === undefined || account === undefined || network === undefined || signature === undefined) {
            setToken(undefined)
        } else {
            try {
                const verifyAddress = ethers.utils.verifyMessage(config.AUTH_KEYWORD, signature)
                if (account.address === verifyAddress) setToken("MEMBER_TOKEN")
                else setToken("NON_MEMBER_TOKEN")
            } catch (error) {
                console.log("web3.checkSignature() is failed", error)
                setToken("NON_AUTH_TOKEN")
            }
        }
    }

    useEffect(() => {
        authN()
    }, [signer, account, network, signature])

    return token
}
