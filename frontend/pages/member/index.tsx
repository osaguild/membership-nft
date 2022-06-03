import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { sign, getSignerAddress } from "../../lib/web3";
import { getKeyword, authN, authR } from "../../lib/auth";

export default function Member() {
  const router = useRouter();
  const [account, setAccount] = useState(undefined);
  const [token, setToken] = useState(undefined);

  const success = (address: string, token: string) => {
    console.log("success", address, token);
    setAccount(address);
    setToken(token);
  };
  const failed = () => {
    console.log("failed");
    router.push("/");
  }

  const auth = async () => {
    const signature = await sign(getKeyword());
    //const address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const address = await getSignerAddress();
    const token = await authN(signature, address);
    if (typeof token === 'string' && await authR(token, "/member")) {
      success(address, token)
    } else {
      failed();
    }
  }

  useEffect(() => {
    auth();
  }, [])

  return (
    <div>
      member only
    </div>
  )
}