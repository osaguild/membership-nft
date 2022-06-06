import { ethers } from "ethers"
import { questionsToArray } from "./converter"
import { Manager__factory, Checker__factory } from "../typechain-types"
import { config } from "../config/config"


export async function connectWallet(): Promise<boolean> {
  try {
    if (!window.ethereum) return false
    await getProvider().send("eth_requestAccounts", [])
    return true
  } catch (error: any) {
    console.log("web3.connectWallet() is failed", error)
    return false
  }
}

export async function addMember(account: string): Promise<ethers.ContractTransaction | undefined> {
  try {
    const manager = Manager__factory.connect(config.MANAGER_CONTRACT_ADDRESS, getSigner())
    return await manager.addMember(config.NFT_CONTRACT_ADDRESS, config.CHECKER_CONTRACT_ADDRESS, account)
  } catch (error: any) {
    console.log("web3.addMember() is failed", error)
    return undefined
  }
}

export async function getQuestions(): Promise<Question[] | undefined> {
  try {
    const checker = Checker__factory.connect(config.CHECKER_CONTRACT_ADDRESS, getProvider())
    const countOfQuestions = await checker.getCountOfQuestions()
    if (countOfQuestions === undefined) return undefined
    const questions: Question[] = []
    for (let i = 1; i <= countOfQuestions.toNumber(); i++) {
      questions.push({ id: i, text: await checker.getQuestion(i), answer: false })
    }
    return questions
  } catch (error) {
    console.log("web3.getQuestions() is failed", error)
    return undefined
  }
}

export async function registAnswers(question: Question[]): Promise<ethers.ContractTransaction | undefined> {
  try {
    const checker = Checker__factory.connect(config.CHECKER_CONTRACT_ADDRESS, getSigner())
    const [ids, , answers] = questionsToArray(question)
    return await checker.registAnswers(ids, answers)
  } catch (error) {
    console.log("web3.registAnswers() is failed", error)
    return undefined
  }
}

export async function sign(message: string): Promise<string | undefined> {
  try {
    const signer = getSigner()
    return await signer.signMessage(message)
  } catch (error) {
    console.log("web3.sign() is failed", error)
    return undefined
  }
}

export async function checkSignature(message: string, signature: string): Promise<boolean> {
  try {
    const signerAddress = await getSignerAddress()
    const verifyAddress = ethers.utils.verifyMessage(message, signature)
    return (signerAddress == verifyAddress) ? true : false
  } catch (error) {
    console.log("web3.checkSignature() is failed", error)
    return false
  }
}

export async function isMemberAccount(address: string): Promise<boolean> {
  try {
    const manager = Manager__factory.connect(config.MANAGER_CONTRACT_ADDRESS, getProvider())
    return (await manager.isMember(config.NFT_CONTRACT_ADDRESS, address)) ? true : false
  } catch (error) {
    console.log("web3.isMemberAccount() is failed", error)
    return false
  }
}

export async function isAnsweredAccount(address: string): Promise<boolean> {
  try {
    const checker = Checker__factory.connect(config.CHECKER_CONTRACT_ADDRESS, getProvider())
    return (await checker.isAnswered(address)) ? true : false
  } catch (error) {
    console.log("web3.isAnsweredAccount() is failed", error)
    return false
  }
}

export async function getSignerAddress(): Promise<string | undefined> {
  try {
    const signer = getSigner()
    return await signer.getAddress()
  } catch (error) {
    console.log("web3.getSignerAddress() is failed", error)
    return undefined
  }
}

export async function getNetwork(): Promise<ethers.providers.Network | undefined> {
  return await getProvider().getNetwork()
}

export async function switchNetwork(networkId: Network): Promise<boolean> {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${networkId.toString(16)}` }]
    })
    return true
  } catch (error) {
    console.log("web3.switchNetwork() is failed", error)
    return false
  }
}

function getProvider(): ethers.providers.Web3Provider {
  return new ethers.providers.Web3Provider(window.ethereum)
}

function getSigner(): ethers.Signer {
  return getProvider().getSigner()
}