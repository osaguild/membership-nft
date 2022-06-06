import Header from "../components/header"
import Questions from "../components/questions"
import Footer from "../components/footer"
import ReactLoading from "react-loading"
import { useState, useEffect } from "react"
import { getQuestions, getSignerAddress, isAnsweredAccount, isMemberAccount } from "../lib/web3"
import { Container } from "@mui/material"
import { useProvider } from "../states/useProvider"
import { useSigner } from "../states/useSigner"
import { useAccount } from "../states/useAccount"
import { useNetwork } from "../states/useNetwork"

export default function Home() {
  const provider = useProvider()
  const signer = useSigner(provider)
  const account = useAccount(signer)
  const network = useNetwork(provider)
  const [isAnswered, setAnswered] = useState<boolean | undefined>(undefined)
  const [isMember, setMember] = useState<boolean | undefined>(undefined)
  const [isLoading, setLoading] = useState(true)
  const [questions, setQuestions] = useState<Question[] | undefined>(undefined)

  const init = async () => {
    setAnswered(await isAnsweredAccount(await getSignerAddress() as string))
    setMember(await isMemberAccount(await getSignerAddress() as string))
    setQuestions(await getQuestions())
    setLoading(false)
  }

  useEffect(() => {
    init()
    window.ethereum.on("accountsChanged", (accounts: any) => {
      console.log("accountsChanged", accounts)
      window.location.reload()
    })
    window.ethereum.on("chainChanged", (chainId: any) => {
      console.log("chainChanged", chainId)
      window.location.reload()
    })
  }, [])

  if (isLoading) {
    return <ReactLoading type="bubbles" color="#99ffff" height="300px" width="300px" />
  } else {
    return (
      <div>
        <Header account={account} network={network} isAnswered={isAnswered} isMember={isMember} />
        <Container sx={{ p: 5 }} maxWidth="xl">
          <Questions account={account} questions={questions} setQuestions={setQuestions} setLoading={setLoading} />
        </Container>
        <Footer />
      </div>
    )
  }
}