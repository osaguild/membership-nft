import { addMember, checkAnswer } from "../lib/web3";
import Button from "@mui/material/Button";

async function mint() {
  // check answer
  const isCorrect1: boolean = await checkAnswer(0, true);
  const isCorrect2: boolean = await checkAnswer(1, true);
  if (!isCorrect1 || !isCorrect2) { return };

  // add member
  await addMember();

  // check transaction
  // todo: call ethereum api for check
}

export default function Join() {
  return (
    <Button variant="contained" onClick={mint}>
      Join Us
    </Button>
  );
}