import { sign, checkSignature } from "../lib/web3";
import Button from "@mui/material/Button";

export default function Login(props: any) {

  const login = async () => {
    const success = () => {
      props.setLoading(false);
      alert("Success to login!");
    }
    const failed = (_message: string) => {
      props.setLoading(false);
      alert(`Failed to login. ${_message}`);
    }

    props.setLoading(true);
    const message = "hello im osaguild";
    const [signResult, signature]: [string, string] = await sign(message);
    if (signResult === "failed") { return failed("Login is failed") };
    const checkSignResult: string = await checkSignature(message, signature);
    if (checkSignResult === "failed") { return failed("Login is failed") }
    success();
  };

  return (
    <Button variant="contained" onClick={login}>
      Login
    </Button>
  );
}