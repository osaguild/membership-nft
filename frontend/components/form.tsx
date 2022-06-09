import { useState } from 'react'
import { Checkbox, Typography, Box, Button } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'
import { useProvider } from '../states/useProvider'
import { useSigner } from '../states/useSigner'
import { useQuestions } from '../states/useQuestions'
import { useAnswers } from '../states/useAnswers'
import { useAccount } from '../states/useAccount'
import { config } from '../config/config'
import { Manager__factory, Checker__factory } from "../typechain-types"
import { checkTransaction } from '../lib/etherScan'

export default function Form() {
  const [_answers, _setAnswers] = useState<Answer[] | undefined>()
  const provider = useProvider()
  const signer = useSigner(provider)
  const questions = useQuestions(provider)
  const answers = useAnswers(questions, _answers)
  const account = useAccount(provider, signer)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _answers: Answer[] = [...answers as Answer[]]
    for (const _answer of _answers) {
      if (_answer.id === Number(event.target.name)) _answer.answer = event.target.checked
    }
    _setAnswers(_answers)
  }

  const regist = async () => {
    if (signer === undefined || answers === undefined) return
    try {
      const [arrayIds, arrayAnswers] = answersToArray(answers)
      const tx = await Checker__factory.connect(config.CHECKER_CONTRACT_ADDRESS, signer).registAnswers(arrayIds, arrayAnswers)
      const result = await checkTransaction(tx.hash) ? "registAnswers() is success" : "registAnswers() is failed."
      console.log(result)
    } catch (error) {
      console.log("registAnswers() is failed", error)
    }
  }

  const answersToArray = (answers: Answer[]): [number[], boolean[]] => {
    const _ids: number[] = []
    const _answers: boolean[] = []
    for (const answer of answers) {
      _ids.push(answer.id)
      _answers.push(answer.answer)
    }
    return [_ids, _answers]
  }

  const mint = async () => {
    if (signer === undefined || account === undefined) return
    try {
      const tx = await Manager__factory.connect(config.MANAGER_CONTRACT_ADDRESS, signer)
        .addMember(config.NFT_CONTRACT_ADDRESS, config.CHECKER_CONTRACT_ADDRESS, account.address)
      const result = await checkTransaction(tx.hash) ? "addMember() is success" : "addMember() is failed"
      console.log(result)
    } catch (error) {
      console.log("addMember() is failed", error)
    }
  }

  const domForm = () => {
    const list: JSX.Element[] = []
    if (questions === undefined || answers === undefined) return list
    else {
      for (let i = 0; i < questions.length; i++) {
        list.push(
          <Typography variant="body1" key={questions[i].id} gutterBottom>
            <Checkbox checked={answers[i].answer} onChange={handleChange} name={questions[i].id.toString()} />
            {questions[i].question}
          </Typography>
        )
      }
      return list
    }
  }

  if (questions === undefined || answers === undefined) {
    return (
      <div>
        <ErrorIcon sx={{ fontSize: 128 }} />
        < Typography variant="body1" gutterBottom >
          Failed to load questions.
        </Typography >
      </div>
    )
  } else {
    return (
      <div>
        <div>
          <Typography variant="body1" gutterBottom>
            If you would like to join us. Please answer the following questions.
          </Typography>
          {domForm()}
        </div>
        <Box display="flex" justifyContent="center">
          <Button variant="contained" onClick={regist}>
            Regist
          </Button>
          <Box width="20px" />
          <Button variant="contained" onClick={mint}>
            Join Us
          </Button>
        </Box>
      </div>
    )
  }
}