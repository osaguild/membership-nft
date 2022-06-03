import { addMember } from "../lib/web3"
import { checkTransaction } from "../lib/etherScan"
import Button from "@mui/material/Button"

export default function Join(props: any) {

  const mint = async () => {
    const success = () => {
      props.setLoading(false)
      alert("Success to mint!")
    }
    const failed = (_message: string) => {
      props.setLoading(false)
      alert(`Failed to mint. ${_message}`)
    }

    props.setLoading(true)
    const tx = await addMember(props.account)
    if (tx === undefined) { failed("Add member is failed") }
    else if (await checkTransaction(tx.hash)) { success() }
    else { failed("Check transaction is failed") }
  }

  return (
    <Button variant="contained" onClick={mint}>
      Join Us
    </Button>
  )
}