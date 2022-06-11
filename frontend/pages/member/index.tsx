import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container } from '@mui/system'
import { SignatureLike } from '@ethersproject/bytes'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useProvider } from '../../states/useProvider'
import { useSigner } from '../../states/useSigner'
import { useToken } from '../../states/useToken'
import { useAccount } from '../../states/useAccount'
import { useNetwork } from '../../states/useNetwork'
import { config } from '../../config'

export default function Member() {
  const router = useRouter()
  const [signature, setSignature] = useState<SignatureLike | undefined>()
  const provider = useProvider()
  const signer = useSigner(provider)
  const account = useAccount(provider, signer)
  const network = useNetwork(provider)
  const token = useToken(signer, account, network, signature)


  useEffect(() => {
    if (provider === undefined || signer === undefined || account === undefined || network === undefined) {
      console.log("not ready for signature")
      setSignature(undefined)
    } else if (signature === undefined) {
      try {
        signer.signMessage(config.AUTH_KEYWORD).then(setSignature)
        console.log("sign is success")
      } catch (error) {
        console.log("sign is failed (or rejected). go to top page")
        router.push("/")
      }
    } else if (token === "MEMBER_TOKEN") {
      console.log("login is success")
    } else if (token === "NON_MEMBER_TOKEN") {
      console.log("login is failed. non member user go to top page")
      router.push("/")
    } else if (token === "NON_AUTH_TOKEN") {
      console.log("login is failed. non auth user go to top page")
      router.push("/")
    }
  }, [provider, signer, account, network, signature, token, router])

  return (
    <div>
      <Header />
      <Container sx={{ p: 5 }} maxWidth="xl" >
        Welcome to Member Page!!
      </Container >
      <Footer />
    </div>
  )
}