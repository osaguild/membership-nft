import { addMember, checkAnswer } from "../lib/web3";
import { checkTransaction } from "../lib/etherScan";
import Button from "@mui/material/Button";
import { useState } from "react";
import ReactLoading from "react-loading";

export default function Join() {
  const [isLoading, setLoading] = useState(false);

  async function mint() {
    setLoading(true);
    let message: string = "";

    const isCorrect1: boolean = await checkAnswer(0, true);
    const isCorrect2: boolean = await checkAnswer(1, true);

    if (isCorrect1 && isCorrect2) {
      const tx = await addMember();
      const result = await checkTransaction(tx.hash);
      message = result === "success" ? "Success to mint!" : "Failed to mint! Please try again.";
    } else {
      message = "Failed to mint! Please try again.";
    }

    setLoading(false);
    alert(message);
  }

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