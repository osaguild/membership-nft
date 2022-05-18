import styles from "../styles/wallet.module.scss";

export default function Wallet() {
  function click() {
    alert("wallet is clicked");
  }
  return (
    <div className= "wallet" onClick={click}>
      connect wallet
    </div>
  );
}