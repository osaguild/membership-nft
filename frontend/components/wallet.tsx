import connectWallet from "../lib/web3";
import Button from "@mui/material/Button";

export default function Wallet() {
  return (
    <Button variant="contained" onClick={connectWallet}>
      Wallet
    </Button>
  );
}