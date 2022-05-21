import { ethers } from "ethers";
import { NFT__factory } from "../typechain-types";

let currentAccount: string;
const managerAddress = process.env.NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS;
const nftAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
const managerAbi = [
  "function addMember(address _nft,address _member) public",
];
const nftAbi = [
  "function balanceOf(address owner) public view virtual override returns (uint256)",
];

export async function connectWallet() {

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

};

export async function addMember() {

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const manager = await new ethers.Contract(
      managerAddress,
      managerAbi,
      provider,
    );
    const managerWithSigner = manager.connect(signer);
    const tx = await managerWithSigner.addMember(nftAddress, currentAccount);
    console.log("transaction", tx);
    alert("add member success");    
  } catch (error) {
    console.log("failed to send transaction", error);
    alert("failed to send transaction. please check console.log");
  };

};

export async function getBalance() {

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const nft = NFT__factory.connect(nftAddress, provider);
    const balance = await nft.balanceOf(currentAccount);
    console.log("balanceOf", balance);
    alert(`get balance is ${balance.toNumber()}`);
    
  } catch (error) {
    console.log("failed to send transaction", error);
    alert("failed to get balance. please check console.log");
  };

};