import { ethers } from "ethers";
import { NFT__factory, Manager__factory, Checker__factory } from "../typechain-types";

let currentAccount: string;
const managerAddress = process.env.NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS;
const nftAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
const checkerAddress = process.env.NEXT_PUBLIC_CHECKER_CONTRACT_ADDRESS;

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
    console.log("connectWallet is failed", error);
    alert("connectWallet is failed. please check console.log");
  }

};

export async function addMember() {

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const manager = Manager__factory.connect(managerAddress, signer);
    const tx = await manager.addMember(nftAddress, currentAccount);
    console.log("transaction", tx);
    alert("add member success");
  } catch (error) {
    console.log("addMenmber is failed", error);
    alert("addMenmber is failed. please check console.log");
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
    console.log("getBalance is failed", error);
    alert("getBalance is failed. please check console.log");
  };

};

export async function getQuestion(id: number): Promise<string> {

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const checker = Checker__factory.connect(checkerAddress, provider);
    const question = await checker.getQuestion(id);
    console.log("question", question);
    return question;
  } catch (error) {
    console.log("getQuestion is failed", error);
    return "getQuestion is failed. please check console.log";
  };
  
};

export async function checkAnswer(id: number, answer: boolean) {

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const checker = Checker__factory.connect(checkerAddress, signer);
    const tx = await checker.checkAnswer(id, answer);
    console.log(`check answer id: ${id}`, tx);
  } catch (error) {
    console.log("checkAnswer is failed", error);
    alert("checkAnswer is failed. please check console.log");
  };

};