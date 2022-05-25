import { ethers } from "ethers";
import { Manager__factory, Checker__factory } from "../typechain-types";

let currentAccount: string;

export async function connectWallet(): Promise<string> {
  try {
    if (!window.ethereum) {
      console.log("connectWallet is failed. you need metamask to use Dapp");
      return "failed";
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    currentAccount = accounts[0];
    return "success";
  } catch (error: any) {
    console.log("connectWallet is failed", error);
    return "failed";
  }
};

export async function addMember(): Promise<[string, any]> {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const manager = Manager__factory.connect(process.env.NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS, signer);
    const tx = await manager.addMember(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS, currentAccount);
    console.log("transaction", tx);
    return ["success", tx];
  } catch (error: any) {
    console.log("addMenmber is failed", error);
    return ["failed", error];
  };
};

export async function getQuestion(id: number): Promise<[string, string]> {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const checker = Checker__factory.connect(process.env.NEXT_PUBLIC_CHECKER_CONTRACT_ADDRESS, provider);
    const question = await checker.getQuestion(id);
    console.log("question", question);
    return ["success", question];
  } catch (error) {
    console.log("getQuestion is failed", error);
    return ["failed", "getQuestion is failed. please check console.log"];
  };
};

export async function checkAnswer(id: number, answer: boolean): Promise<string> {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const checker = Checker__factory.connect(process.env.NEXT_PUBLIC_CHECKER_CONTRACT_ADDRESS, signer);
    const tx = await checker.checkAnswer(id, answer);
    console.log(`check answer id: ${id}`, tx);
    return (tx === true ? "success" : "failed");
  } catch (error) {
    console.log("checkAnswer is failed", error);
    return "failed";
  };
};