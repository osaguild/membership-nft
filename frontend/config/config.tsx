const setConfig = (): Config => {

  const nft = (): string => {
    if (process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS === undefined) throw new Error("NEXT_PUBLIC_NFT_CONTRACT_ADDRESS is not defined.")
    else return process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
  }
  const manager = (): string => {
    if (process.env.NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS === undefined) throw new Error("NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS is not defined.")
    else return process.env.NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS
  }

  const checker = (): string => {
    if (process.env.NEXT_PUBLIC_CHECKER_CONTRACT_ADDRESS === undefined) throw new Error("NEXT_PUBLIC_CHECKER_CONTRACT_ADDRESS is not defined.")
    else return process.env.NEXT_PUBLIC_CHECKER_CONTRACT_ADDRESS
  }

  const ether = (): string => {
    if (process.env.NEXT_PUBLIC_ETHER_SCAN_API_KEY === undefined) throw new Error("NEXT_PUBLIC_ETHER_SCAN_API_KEY is not defined.")
    else return process.env.NEXT_PUBLIC_ETHER_SCAN_API_KEY
  }

  return {
    NFT_CONTRACT_ADDRESS: nft(),
    MANAGER_CONTRACT_ADDRESS: manager(),
    CHECKER_CONTRACT_ADDRESS: checker(),
    ETHER_SCAN_API_KEY: ether(),
  }
}

export const config: Config = setConfig()