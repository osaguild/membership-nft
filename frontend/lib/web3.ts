import { ethers } from "ethers"
import { questionsToArray } from "./converter"
import { Manager__factory, Checker__factory } from "../typechain-types"


export async function connectWallet(): Promise<string | undefined> {
  try {
    if (!window.ethereum) return undefined
    await getProvider().send("eth_requestAccounts", [])
    return getSignerAddress()
  } catch (error: any) {
    console.log("web3.connectWallet() is failed", error)
    return undefined
  }
}

export async function addMember(account: string): Promise<ethers.ContractTransaction | undefined> {
  try {
    const manager = Manager__factory.connect(process.env.NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS, getSigner())
    return await manager.addMember(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS, process.env.NEXT_PUBLIC_CHECKER_CONTRACT_ADDRESS, account)
  } catch (error: any) {
    console.log("web3.addMember() is failed", error)
    return undefined
  }
}

export async function getQuestions(): Promise<Question[] | undefined> {
  try {
    const checker = Checker__factory.connect(process.env.NEXT_PUBLIC_CHECKER_CONTRACT_ADDRESS, getProvider())
    const countOfQuestions = await checker.getCountOfQuestions()
    if (typeof countOfQuestions === undefined) return undefined
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
    const checker = Checker__factory.connect(process.env.NEXT_PUBLIC_CHECKER_CONTRACT_ADDRESS, getSigner())
    const [ids, , answers] = questionsToArray(question)
    return await checker.registAnswers(ids, answers)
  } catch (error) {
    console.log("web3.registAnswers() is failed", error)
    return undefined
  }
}

export async function sign(message: string): Promise<string> {
  const signer = getSigner()
  return await signer.signMessage(message)
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

export async function isMember(address: string): Promise<boolean> {
  try {
    const manager = Manager__factory.connect(process.env.NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS, getProvider())
    return (await manager.isMember(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS, address)) ? true : false
  } catch (error) {
    console.log("web3.isMember() is failed", error)
    return false
  }
}

export async function getSignerAddress(): Promise<string> {
  const signer = getSigner()
  const address = await signer.getAddress()
  return address
}

function getProvider(): ethers.providers.Web3Provider {
  return new ethers.providers.Web3Provider(window.ethereum)
}

function getSigner(): ethers.Signer {
  return getProvider().getSigner()
}