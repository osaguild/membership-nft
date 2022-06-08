type Token = "MEMBER_TOKEN" | "NON_MEMBER_TOKEN"
type Path = "/" | "/member"
type Account = {
  address: string
  isAnswered: boolean
  isMember: boolean
}
type Question = {
  id: number
  question: string
}
type Answer = {
  id: number
  answer: boolean
}
interface Window {
  ethereum: any;
}
type ChainId = 1 | 4 | 137
type Config = {
  NFT_CONTRACT_ADDRESS: string
  MANAGER_CONTRACT_ADDRESS: string
  CHECKER_CONTRACT_ADDRESS: string
  ETHER_SCAN_API_KEY: string
}