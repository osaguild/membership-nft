import { getQuestion } from "../lib/web3";
import { useState, useEffect } from "react";
import { Checkbox } from "@mui/material";
import ReactLoading from "react-loading";

export default function Question() {
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState({
    q1Question: "",
    q2Question: "",
  });
  const [answers, setAnswers] = useState({
    q1Answer: false,
    q2Answer: false,
  });
  const { q1Question, q2Question } = questions;
  const { q1Answer, q2Answer } = answers;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({
      ...answers,
      [event.target.name]: event.target.checked,
    });
  };
  const getQuestions = async () => {
    const [q1Result,q1Text] = await getQuestion(0);
    const [q2Result,q2Text] = await getQuestion(1);
    if (q1Result === "failed" || q2Result === "failed") { return};
    setQuestions({
      q1Question: q1Text,
      q2Question: q2Text,
    });
  }
  useEffect(() => {
    getQuestions().then(() => {setLoading(false)});
  }, [])

  if (isLoading) {
    return <ReactLoading type="bubbles" color="#99ffff" height="300px" width="300px" />;
  } else {
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
}