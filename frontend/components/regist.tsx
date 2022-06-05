import { registAnswers } from "../lib/web3"
import { checkTransaction } from "../lib/etherScan"
import Button from "@mui/material/Button"

export default function Regist(props: any) {

  const regist = async () => {

    const success = () => {
      props.setLoading(false)
      alert("Success to regist!")
    }
    const failed = () => {
      props.setLoading(false)
      alert("Failed to regist.")
    }

    props.setLoading(true)
    const tx = await registAnswers(props.questions)
    if (tx === undefined) failed()
    else if (await checkTransaction(tx.hash)) success()
    else failed()
  }

  return (
    <Button variant="contained" onClick={regist}>
      Regist
    </Button>
  )
}