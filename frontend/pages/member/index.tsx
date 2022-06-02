import { useEffect } from "react";
import { useRouter } from "next/router";
import { sign, checkSignature, isMember } from "../../lib/web3";

export default function Member() {
  const router = useRouter();

  const wk = async () => {
    const message = "hello im osaguild";
    const [signResult, signature]: [string, string] = await sign(message);
    if (signResult === "failed") { console.log("Sign is failed") };
    const checkSignResult: string = await checkSignature(message, signature);
    if (checkSignResult === "failed") { console.log("Signature is wrong") }
    const isMemberResult: string = await isMember(router.query.account);
    if (isMemberResult === "failed") { console.log("You are not a member") }
  }

  useEffect(() => {
    wk();
  }, [])

  return (
    <div>
      member only
    </div>
  )
}