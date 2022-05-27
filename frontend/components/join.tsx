import { addMember, checkAnswer } from "../lib/web3";
import { checkTransaction } from "../lib/etherScan";
import Button from "@mui/material/Button";
import { useState } from "react";
import ReactLoading from "react-loading";

export default function Join(props: any) {
  const { q1Answer, q2Answer } = props.answers;

  const mint = async () => {
    const success = () => {
      props.setLoading(false);
      alert("Success to mint!");
    }
    const failed = (_message: string) => {
      props.setLoading(false);
      alert(`Failed to mint. ${_message}`);
    }

    props.setLoading(true);
    const checkAnswerResult1: string = await checkAnswer(0, q1Answer);
    const checkAnswerResult2: string = await checkAnswer(1, q2Answer);
    if (checkAnswerResult1 === "failed" || checkAnswerResult2 === "failed") { return failed("Your answer is incorrect."); };
    const [addMemberResult, addMemberData]: [string, any] = await addMember();
    if (addMemberResult === "failed") { return failed("Add member is failed") };
    const checkRes = await checkTransaction(addMemberData.hash);
    if (checkRes === "failed") { return failed("Check transaction is failed") };
    success();
  };

  return (
    <Button variant="contained" onClick={mint}>
      Join Us
    </Button>
  );
}