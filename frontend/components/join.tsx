import { addMember, checkAnswer } from "../lib/web3";
import { checkTransaction } from "../lib/etherScan";
import Button from "@mui/material/Button";
import { useState } from "react";
import ReactLoading from "react-loading";

export default function Join() {
  const [isLoading, setLoading] = useState(false);

  const mint = async () => {
    const success = () => {
      setLoading(false);
      alert("Success to mint!");
    }
    const failed = (_message: string) => {
      setLoading(false);
      alert(`Failed to mint. ${_message}`);
    }

    setLoading(true);
    const checkAnswerResult1: string = await checkAnswer(0, true);
    const checkAnswerResult2: string = await checkAnswer(1, true);
    if (checkAnswerResult1 === "failed" || checkAnswerResult2 === "failed") { return failed("Your answer is incorrect."); };
    const [addMemberResult, addMemberData]: [string, any] = await addMember();
    if (addMemberResult === "failed") { return failed("Add member is failed") };
    const checkRes = await checkTransaction(addMemberData.hash);
    if (checkRes === "failed") { return failed("Check transaction is failed") };
    success();
  };

  if (isLoading) {
    return <ReactLoading type="bubbles" color="#99ffff" height="300px" width="300px" />;
  } else {
    return (
      <Button variant="contained" onClick={mint}>
        Join Us
      </Button>
    );
  };
}