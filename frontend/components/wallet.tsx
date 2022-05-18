import connectWallet from "../lib/web3";

export default function Wallet() {
  function click() {
    connectWallet();
  }
  return (
    <div onClick={click}>
      connect wallet
    </div>
  );
}