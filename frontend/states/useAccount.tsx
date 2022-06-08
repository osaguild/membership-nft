import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { Manager__factory, Checker__factory } from "../typechain-types"
import { config } from "../config/config"

export const useAccount = (
    provider: ethers.providers.Web3Provider | undefined,
    signer: ethers.providers.JsonRpcSigner | undefined,
) => {
    const [account, setAccount] = useState<Account | undefined>()

    const init = async (
        provider: ethers.providers.Web3Provider | undefined,
        signer: ethers.providers.JsonRpcSigner | undefined,
    ) => {
        if (provider === undefined || signer === undefined) {
            setAccount(undefined)
            return
        }

        let address: string
        try {
            address = await signer.getAddress()
        } catch (error) {
            console.log("useAccount.getAddress() is failed. Please check your wallet is connected", error)
            setAccount(undefined)
            return
        }
        try {
            const isAnswered = await Checker__factory.connect(config.CHECKER_CONTRACT_ADDRESS, provider).isAnswered(address)
            const isMember = await Manager__factory.connect(config.MANAGER_CONTRACT_ADDRESS, provider).isMember(config.NFT_CONTRACT_ADDRESS, address)
            setAccount({
                address: address,
                isAnswered: isAnswered,
                isMember: isMember,
            })
        } catch (error) {
            console.log("useAccount.getAddress() is failed. Please check your network is supported", error)
            setAccount({
                address: address,
                isAnswered: false,
                isMember: false,
            })
        }
    }

    useEffect(() => {
        // check accountsChange event
        window.ethereum.on("accountsChanged", (accounts: any) => {
            init(provider, signer)
        })
        init(provider, signer)
    }, [provider, signer])
    
    return account
}
