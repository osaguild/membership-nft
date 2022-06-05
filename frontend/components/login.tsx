import Button from "@mui/material/Button"
import Link from "next/link"
import Box from "@mui/material/Box"

export default function Login(props: any) {
  if (props.isMember === true) {
    return (
      <Link href="/member">
        <Button variant="contained">
          Login
        </Button>
      </Link>
    )
  } else {
    return <Box />
  }
}