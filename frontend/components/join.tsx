import { addMember, checkAnswer } from "../lib/web3";
import { checkTransaction } from "../lib/etherScan";
import Button from "@mui/material/Button";

async function mint() {
  // check answer
  const isCorrect1: boolean = await checkAnswer(0, true);
  const isCorrect2: boolean = await checkAnswer(1, true);
  if (!isCorrect1 || !isCorrect2) { return };

  // add member
  const tx = await addMember();

  // check transaction
  const result = await checkTransaction(tx.hash);

}

export default function Join() {
  return (
    <Button variant="contained" onClick={mint}>
      Join Us
    </Button>
  );
}