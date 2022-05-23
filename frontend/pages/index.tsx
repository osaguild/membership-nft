import Wallet from "../components/wallet";
import Join from "../components/join";
import Question from "../components/question";

export default function Home() {
  return (
    <div>
      <Wallet />
      <hr />
      <Question />
      <hr />
      <Join />
    </div>
  )
}