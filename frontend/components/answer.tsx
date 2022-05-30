import { registAnswers } from "../lib/web3";
import { checkTransaction } from "../lib/etherScan";
import Button from "@mui/material/Button";

export default function Answer(props: any) {
  const { q1Answer, q2Answer } = props.answers;

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
    const [registAnswersResult, registAnswersData]: [string, any] = await registAnswers([1, 2], [q1Answer, q2Answer]);
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