import Button from "@mui/material/Button";
import Link from "next/link";

export default function Login() {
  return (
    <Link href="/member">
      <Button variant="contained">
        Login
      </Button>
    </Link>
  );
}