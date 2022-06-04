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