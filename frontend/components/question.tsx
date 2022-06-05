import { Checkbox } from "@mui/material"

export default function Question(props: any) {

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
        <p key={props.questions[i].id}>
          <Checkbox checked={props.questions[i].answer} onChange={handleChange} name={props.questions[i].id.toString()} />
          {props.questions[i].text}
        </p>
      )
    }
    return list
  }

  return dom().length === 0
    ? <div>No Questions</div>
    : <div>{dom()}</div>
}