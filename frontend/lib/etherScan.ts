import axios from "axios";

export async function checkTransaction(txhash: string): Promise<string> {
  const check1 = await checkContractExecutionStatus(txhash);
  const check2 = await checkTransactionReceiptStatus(txhash);
  return ((check1 === "success" && check2 === "success") ? "success" : "failed");
};

async function checkContractExecutionStatus(txhash: string): Promise<string> {
  const uri = encodeURI(`https://api-rinkeby.etherscan.io/api?module=transaction&action=getstatus&txhash=${txhash}&apikey=${process.env.NEXT_PUBLIC_ETHER_SCAN_API_KEY}`);
  const res = await axios.get(uri);
  console.log("check 1: ", res.data);
  return (res.data.status === "1" ? "success" : "failed");
};

async function checkTransactionReceiptStatus(txhash: string): Promise<string> {
  const uri = encodeURI(`https://api-rinkeby.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txhash}&apikey=${process.env.NEXT_PUBLIC_ETHER_SCAN_API_KEY}`);
  const res = await axios.get(uri);
  console.log("check 2: ", res.data);
  return (res.data.status === "1" ? "success" : "failed");
};
