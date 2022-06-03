import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { sign, getSignerAddress } from "../../lib/web3"
import { getKeyword, authN, authR } from "../../lib/auth"
import ReactLoading from "react-loading"

export default function Member() {
  const router = useRouter()
  const [isLoading, setLoading] = useState(true)
  const [account, setAccount] = useState<string | undefined>(undefined)
  const [token, setToken] = useState<string | undefined>(undefined)

  const success = (address: string, token: string) => {
    setAccount(address)
    setToken(token)
    setLoading(false)
  }
  const failed = () => {
    setLoading(false)
    router.push("/")
  }

  const auth = async () => {
    setLoading(true)
    const signature = await sign(getKeyword())
    const address = await getSignerAddress()
    if (signature === undefined || address === undefined) return failed()
    const token = await authN(signature, address)
    if (token === undefined) return failed()
    if (await authR(token, "/member")) return success(address, token)
  }

  useEffect(() => {
    auth()
  }, [])

  if (isLoading) {
    return <ReactLoading type="bubbles" color="#99ffff" height="300px" width="300px" />
  } else {
    return (
      <div>
        Wellcome to Member Page
      </div>
    )
  }

}