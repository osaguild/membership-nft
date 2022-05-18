import { ethers } from "ethers";

let currentAccount: string;

export default async function connectWallet() {

  try {
    if (!window.ethereum) {
      alert("you need metamask to use Dapp");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    currentAccount = accounts[0];
    alert(`connect success to ${currentAccount}`);
  } catch (error) {
    console.log("reject your connection request", error);
    alert("reject your connection request. please check console.log");
  }

}
