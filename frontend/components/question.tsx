import { Checkbox } from "@mui/material";

export default function Question(props: any) {
  const { q1Question, q2Question } = props.questions;
  const { q1Answer, q2Answer } = props.answers;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setAnswers({
      ...props.answers,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div>
      <p>
        <Checkbox checked={q1Answer} onChange={handleChange} name="q1Answer" />
        {q1Question}
      </p>
      <p>
        <Checkbox checked={q2Answer} onChange={handleChange} name="q2Answer" />
        {q2Question}
      </p>
    </div>
  );
}