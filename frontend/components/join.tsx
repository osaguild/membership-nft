import { addMember } from "../lib/web3";
import Button from "@mui/material/Button";

export default function Join() {
  return (
    <Button variant="contained" onClick={addMember}>
      Join Us
    </Button>
  );
}