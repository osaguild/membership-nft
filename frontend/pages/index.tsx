import Wallet from "../components/wallet";
import Join from "../components/join";
import Balance from "../components/balance";
import Question from "../components/question";

export default function Home() {
  return (
    <div>
      <div>
        <Wallet />
        <Join />
        <Balance />
      </div>
      <div>
        <Question />
      </div>
    </div>
  )
}