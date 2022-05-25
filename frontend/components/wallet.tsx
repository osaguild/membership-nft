import { connectWallet } from "../lib/web3";
import Button from "@mui/material/Button";

export default function Wallet() {

  const connect = async () => {
    const result = await connectWallet();
    const message = result === "success" ? "Success to connect." : "Failed to connect. Please check console.log.";
    alert(message);
  };

  return (
    <Button variant="contained" onClick={connect}>
      Wallet
    </Button>
  );
}