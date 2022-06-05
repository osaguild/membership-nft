import Header from "../components/header"
import Join from "../components/join"
import Question from "../components/question"
import Answer from "../components/answer"
import Footer from "../components/footer"
import ReactLoading from "react-loading"
import { useState, useEffect } from "react"
import { getQuestions, getSignerAddress, getNetwork, isAnsweredAccount, isMemberAccount } from "../lib/web3"
import { ethers } from "ethers"
import { Container } from "@mui/material"

export default function Home() {
  const [account, setAccount] = useState<string | undefined>(undefined)
  const [network, setNetwork] = useState<ethers.providers.Network | undefined>(undefined)
  const [isAnswered, setAnswered] = useState<boolean | undefined>(undefined)
  const [isMember, setMember] = useState<boolean | undefined>(undefined)
  const [isLoading, setLoading] = useState(true)
  const [questions, setQuestions] = useState<Question[] | undefined>(undefined)

  const init = async () => {
    setAccount(await getSignerAddress())
    setNetwork(await getNetwork())
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
        <Container maxWidth="xl">
          <Question questions={questions} setQuestions={setQuestions} />
          <Answer questions={questions} setLoading={setLoading} />
          <Join account={account} setLoading={setLoading} />
        </Container>
        <Footer />
      </div>
    )
  }
}