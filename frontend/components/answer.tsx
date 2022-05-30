import { registAnswers } from "../lib/web3";
import { checkTransaction } from "../lib/etherScan";
import Button from "@mui/material/Button";

export default function Answer(props: any) {
  const regist = async () => {
    const success = () => {
      props.setLoading(false);
      alert("Success to regist!");
    }
    const failed = (_message: string) => {
      props.setLoading(false);
      alert(`Failed to regist. ${_message}`);
    }

    props.setLoading(true);
    const ids: number[] = [];
    const answers: boolean[] = [];
    for (let i = 0; i < props.questions.length; i++) {
      ids.push(props.questions[i].id);
      answers.push(props.questions[i].answer);
    }
    console.log(ids, answers);
    const [registAnswersResult, registAnswersData]: [string, any] = await registAnswers(ids, answers);
    if (registAnswersResult === "failed") { return failed(registAnswersData) };
    const checkRes = await checkTransaction(registAnswersData.hash);
    if (checkRes === "failed") { return failed("Check transaction is failed") };
    success();
  };

  return (
    <Button variant="contained" onClick={regist}>
      Regist Answers
    </Button>
  );
}