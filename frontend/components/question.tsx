import { getQuestion } from "../lib/web3";
import { useState, useEffect } from "react";
import { Checkbox } from "@mui/material";

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

  async function getQuestions() {
    const _q1 = await getQuestion(0);
    const _q2 = await getQuestion(1);
    setQuestions({
      q1Question: _q1,
      q2Question: _q2,
    });
  }

  useEffect(() => {
    getQuestions().then(() => {
      setLoading(false);
    });
  }, [])

  const { q1Question, q2Question } = questions;
  const { q1Answer, q2Answer } = answers;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({
      ...answers,
      [event.target.name]: event.target.checked,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
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