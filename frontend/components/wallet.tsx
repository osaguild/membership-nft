import styles from "../styles/wallet.module.scss";
import connectWallet from "../lib/web3";

export default function Wallet() {
  function click() {
    connectWallet();
  }
  return (
    <div className= "wallet" onClick={click}>
      connect wallet
    </div>
  );
}