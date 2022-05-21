import Wallet from "../components/wallet";
import Join from "../components/join";
import Balance from "../components/balance";

export default function Home() {
  return (
    <div>
      <Wallet></Wallet>
      <Join></Join>
      <Balance></Balance>
    </div>
  )
}