import { sign, checkSignature, isMember } from "../lib/web3";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

export default function Login(props: any) {
  const router = useRouter();

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
    if (signResult === "failed") { return failed("Sign is failed") };
    const checkSignResult: string = await checkSignature(message, signature);
    if (checkSignResult === "failed") { return failed("Signature is wrong") }
    const isMemberResult: string = await isMember(props.account);
    if (isMemberResult === "failed") { return failed("You are not a member") }
    success();
    router.push({
      pathname: "/member",
      query: { name: "osaguild" }
    });
  };

  return (
    <Button variant="contained" onClick={login}>
      Login
    </Button>
  );
}