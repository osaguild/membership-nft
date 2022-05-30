import { addMember } from "../lib/web3";
import { checkTransaction } from "../lib/etherScan";
import Button from "@mui/material/Button";

export default function Join(props: any) {

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
    const [addMemberResult, addMemberData]: [string, any] = await addMember(props.account);
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