import { getQuestion, checkAnswer } from "../lib/web3";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

async function getQuestions() {
  const questions = [];
  for (let i = 0; i < 2; i++) {
    const question = await getQuestion(i);
    questions.push(question);
  }
  return questions;
}

export default function Question() {
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    getQuestions().then(res => {
      setLoading(false);
      setQuestions(res);
    });
  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {questions.map((value: string, index: number) => {
          return (
            <p key={index}>
              <Button variant="contained" onClick={() => checkAnswer(index, true)}>
                Agree
              </Button>
              {value}
            </p>)
        })}
      </div>
    );
  }
}