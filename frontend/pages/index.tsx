import Wallet from "../components/wallet";
import Join from "../components/join";
import Question from "../components/question";
import Answer from "../components/answer";
import ReactLoading from "react-loading";
import { useState, useEffect } from "react";
import { getQuestions } from "../lib/web3";

export default function Home() {
  const [account, setAccount] = useState(undefined);
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState({
    q1Question: "",
    q2Question: "",
  });
  const [answers, setAnswers] = useState({
    q1Answer: false,
    q2Answer: false,
  });
  useEffect(() => {
    getQuestions().then(res => {
      if (res[0] === "success") {
        setQuestions({
          q1Question: res[1][0],
          q2Question: res[1][1],
        });
      }
      setLoading(false);
    });
  }, [])

  if (isLoading) {
    return <ReactLoading type="bubbles" color="#99ffff" height="300px" width="300px" />;
  } else {
    return (
      <div>
        <Wallet account={account} setAccount={setAccount} />
        <hr />
        <Question questions={questions} answers={answers} setAnswers={setAnswers} />
        <Answer answers={answers} setLoading={setLoading} />
        <hr />
        <Join account={account} answers={answers} setLoading={setLoading} />
      </div>
    )
  }
}