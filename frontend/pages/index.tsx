import Wallet from "../components/wallet";
import Join from "../components/join";
import Question from "../components/question";
import ReactLoading from "react-loading";
import { useState, useEffect } from "react";
import { getQuestion } from "../lib/web3";

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState({
    q1Question: "",
    q2Question: "",
  });
  const [answers, setAnswers] = useState({
    q1Answer: false,
    q2Answer: false,
  });
  const getQuestions = async () => {
    const [q1Result, q1Text] = await getQuestion(0);
    const [q2Result, q2Text] = await getQuestion(1);
    if (q1Result === "failed" || q2Result === "failed") { return };
    setQuestions({
      q1Question: q1Text,
      q2Question: q2Text,
    });
  }
  useEffect(() => {
    getQuestions().then(() => { setLoading(false) });
  }, [])

  if (isLoading) {
    return <ReactLoading type="bubbles" color="#99ffff" height="300px" width="300px" />;
  } else {
    return (
      <div>
        <Wallet />
        <hr />
        <Question questions={questions} answers={answers} setAnswers={setAnswers} />
        <hr />
        <Join />
      </div>
    )
  }
}