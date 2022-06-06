import axios from "axios"
import { config } from "../config/config"

const URI = "https://api-rinkeby.etherscan.io/api?module=transaction&action="

export async function checkTransaction(txhash: string): Promise<boolean> {
  try {
    const check1 = await checkContractExecutionStatus(txhash)
    const check2 = await checkTransactionReceiptStatus(txhash)
    return (check1 === true && check2 === true) ? true : false
  } catch (error) {
    console.log("etherScan.checkTransaction() is failed", error)
    return false
  }
}

async function checkContractExecutionStatus(txhash: string): Promise<boolean> {
  try {
    const uri = encodeURI(`${URI}getstatus&txhash=${txhash}&apikey=${config.ETHER_SCAN_API_KEY}`)
    const res = await axios.get(uri)
    return res.data.status === "1" ? true : false
  } catch (error) {
    console.log("etherScan.checkContractExecutionStatus() is failed", error)
    return false
  }
}

async function checkTransactionReceiptStatus(txhash: string): Promise<boolean> {
  try {
    const uri = encodeURI(`${URI}gettxreceiptstatus&txhash=${txhash}&apikey=${config.ETHER_SCAN_API_KEY}`)
    const res = await axios.get(uri)
    return res.data.status === "1" ? true : false
  } catch (error) {
    console.log("etherScan.checkTransactionReceiptStatus() is failed", error)
    return false
  }
}