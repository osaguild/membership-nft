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
    success();
    router.push({
      pathname: "/member",
      query: { account: props.account }
    });
  };

  return (
    <Button variant="contained" onClick={login}>
      Login
    </Button>
  );
}