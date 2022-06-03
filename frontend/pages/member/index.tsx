import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { sign, getSignerAddress } from "../../lib/web3"
import { getKeyword, authN, authR } from "../../lib/auth"

export default function Member() {
  const router = useRouter()
  const [account, setAccount] = useState<string | undefined>(undefined)
  const [token, setToken] = useState<string | undefined>(undefined)

  const success = (address: string, token: string) => {
    setAccount(address)
    setToken(token)
  }
  const failed = () => router.push("/")

  const auth = async () => {
    const signature = await sign(getKeyword())
    const address = await getSignerAddress()
    if (signature === undefined || address === undefined) return failed()
    const token = await authN(signature, address)
    if (token === undefined) return failed()
    if (await authR(token, "/member")) success(address, token)
  }

  useEffect(() => {
    auth()
  }, [])

  return (
    <div>
      member only
    </div>
  )
}