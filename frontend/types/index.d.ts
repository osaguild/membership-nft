type Token = "MEMBER_TOKEN" | "NON_MEMBER_TOKEN"
type Path = "/" | "/member"
type Question = {
  id: number
  text: string
  answer: boolean
}
interface Window {
  ethereum: any;
}
type Network = 1 | 4 | 137
type Config = {
  NFT_CONTRACT_ADDRESS: string
  MANAGER_CONTRACT_ADDRESS: string
  CHECKER_CONTRACT_ADDRESS: string
  ETHER_SCAN_API_KEY: string
}