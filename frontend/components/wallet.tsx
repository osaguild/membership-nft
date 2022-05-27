import { connectWallet } from "../lib/web3";
import Button from "@mui/material/Button";

export default function Wallet(props: any) {

  const connect = async () => {
    const [result, account] = await connectWallet();
    if (result === "success") {
      props.setAccount(account);
    }
    const message = result === "success" ? "Success to connect." : "Failed to connect. Please check console.log.";
    alert(message);
  };

  if (props.account === undefined) {
    return (
      <Button variant="contained" onClick={connect}>
        Connect Wallet
      </Button>
    );
  } else {
    return (
      <div>
        <Button variant="contained">
          Connected
        </Button>
        {props.account}
      </div>
    );
  };
}