import { ethers } from "ethers";
import { Manager__factory, Checker__factory } from "../typechain-types";

export async function connectWallet(): Promise<[string, any]> {
  try {
    if (!window.ethereum) {
      console.log("connectWallet is failed. you need metamask to use Dapp");
      return ["failed", "connectWallet is failed. you need metamask to use Dapp"];
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    return ["success", accounts[0]];
  } catch (error: any) {
    console.log("connectWallet is failed", error);
    return ["failed", error];
  }
};

export async function addMember(account: string): Promise<[string, any]> {
  try {
    console.log("account", account);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const manager = Manager__factory.connect(process.env.NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS, signer);
    const tx = await manager.addMember(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS, process.env.NEXT_PUBLIC_CHECKER_CONTRACT_ADDRESS, account);
    console.log("transaction", tx);
    return ["success", tx];
  } catch (error: any) {
    console.log("addMenmber is failed", error);
    return ["failed", error];
  };
};

export async function getQuestions(): Promise<[string, any]> {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const checker = Checker__factory.connect(process.env.NEXT_PUBLIC_CHECKER_CONTRACT_ADDRESS, provider);
    const countOfQuestions = await checker.getCountOfQuestions();
    const questions = [];
    for (let i = 1; i <= countOfQuestions.toNumber(); i++) {
      questions.push({ id: i, text: await checker.getQuestion(i) });
    }
    console.log("get questions", questions);
    return ["success", questions];
  } catch (error) {
    console.log("getQuestion is failed", error);
    return ["failed", undefined];
  };
};

export async function registAnswers(id: number[], answer: boolean[]): Promise<[string, any]> {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const checker = Checker__factory.connect(process.env.NEXT_PUBLIC_CHECKER_CONTRACT_ADDRESS, signer);
    const tx = await checker.registAnswers(id, answer);
    console.log(`transaction`, tx);
    return ["success", tx];
  } catch (error) {
    console.log("checkAnswer is failed", error);
    return ["failed", "checkAnswer is failed. please check console.log"];
  };
};

export async function sign(message: string): Promise<string> {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const signature = await signer.signMessage(message);
  return signature;
}

export async function checkSignature(message: string, signature: string): Promise<boolean> {
  try {
    const signerAddress = await getSignerAddress();
    const verifyAddress = ethers.utils.verifyMessage(message, signature);
    return (signerAddress == verifyAddress) ? true : false;
  } catch (error) {
    console.log("Exception is occuerd in web3.checkSignature", error);
    return false;
  }
}

export async function isMember(address: string): Promise<boolean> {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const manager = Manager__factory.connect(process.env.NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS, provider);
    return (await manager.isMember(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS, address)) ? true : false;
  } catch (error) {
    console.log("isMember is failed", error);
    return false;
  };
}

export async function getSignerAddress(): Promise<string> {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  return address;
}