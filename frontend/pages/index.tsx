import Wallet from "../components/wallet";
import Join from "../components/join";
import Question from "../components/question";
import Answer from "../components/answer";
import Login from "../components/login";
import ReactLoading from "react-loading";
import { useState, useEffect } from "react";
import { getQuestions } from "../lib/web3";

export default function Home() {
  type Question = { id: number, text: string, answer: boolean };
  const [account, setAccount] = useState(undefined);
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    getQuestions().then(res => {
      if (res[0] === "failed") { return; };
      const _questions: Question[] = [];
      for (let i = 0; i < res[1].length; i++) {
        _questions.push({ id: res[1][i].id, text: res[1][i].text, answer: false });
      }
      setQuestions(_questions);
      console.log("questions", _questions);
    });
    setLoading(false);
  }, [])

  if (isLoading) {
    return <ReactLoading type="bubbles" color="#99ffff" height="300px" width="300px" />;
  } else {
    return (
      <div>
        <Wallet account={account} setAccount={setAccount} />
        <hr />
        <Question questions={questions} setQuestions={setQuestions} />
        <Answer questions={questions} setLoading={setLoading} />
        <hr />
        <Join account={account} setLoading={setLoading} />
        <hr />
        <Login/>
      </div>
    )
  }
}