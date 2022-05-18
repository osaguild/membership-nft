import { ethers } from "ethers";

export default async function connectWallet() {
  alert("connect wallet is called");

  try {
    if (!window.ethereum) {
      alert("you need metamask to use Dapp");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    console.log("Connected", accounts[0]);
    //this.currentAccount = accounts[0];
  } catch (error) {
    console.log("reject your connection request", error);
  }
}