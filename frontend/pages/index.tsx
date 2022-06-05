import Wallet from "../components/wallet"
import Join from "../components/join"
import Question from "../components/question"
import Answer from "../components/answer"
import Login from "../components/login"
import ReactLoading from "react-loading"
import { useState, useEffect } from "react"
import { getQuestions, getSignerAddress, getNetwork } from "../lib/web3"
import { ethers } from "ethers"

export default function Home() {
  const [account, setAccount] = useState<string | undefined>(undefined)
  const [network, setNetwork] = useState<ethers.providers.Network | undefined>(undefined)
  const [isLoading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<Question[] | undefined>(undefined)

  const init = async () => {
    setLoading(true)
    setAccount(await getSignerAddress())
    setNetwork(await getNetwork())
    setQuestions(await getQuestions())
    setLoading(false)
  }

  useEffect(() => {
    init()
  }, [])

  if (isLoading) {
    return <ReactLoading type="bubbles" color="#99ffff" height="300px" width="300px" />
  } else {
    return (
      <div>
        <Wallet account={account} network={network} setAccount={setAccount} setNetwork={setNetwork} />
        <hr />
        <Question questions={questions} setQuestions={setQuestions} />
        <Answer questions={questions} setLoading={setLoading} />
        <hr />
        <Join account={account} setLoading={setLoading} />
        <hr />
        <Login />
      </div>
    )
  }
}