import { Checkbox, Typography, Box } from "@mui/material"
import ErrorIcon from "@mui/icons-material/Error"
import Regist from "./regist"
import Join from "./join"

export default function Questions(props: any) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const questions: Question[] = [...props.questions]
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].id === Number(event.target.name)) {
        questions[i].answer = event.target.checked
      }
    }
    props.setQuestions(questions)
  }

  const dom = () => {
    const list: JSX.Element[] = []
    if (props.questions === undefined) return list
    for (let i = 0; i < props.questions.length; i++) {
      list.push(
        <Typography variant="body1" key={props.questions[i].id} gutterBottom>
          <Checkbox checked={props.questions[i].answer} onChange={handleChange} name={props.questions[i].id.toString()} />
          {props.questions[i].text}
        </Typography>
      )
    }
    return list
  }

  if (dom().length === 0) {
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
          {dom()}
        </div>
        <Box display="flex" justifyContent="center">
          <Regist questions={props.questions} setLoading={props.setLoading} />
          <Box width="20px" />
          <Join account={props.account} setLoading={props.setLoading} />
        </Box>
      </div>
    )
  }
}