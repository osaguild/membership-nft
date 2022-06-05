import { Chip } from "@mui/material"
import FaceIcon from "@mui/icons-material/Face"
import Box from "@mui/material/Box"

export default function Account(props: any) {

  const dom = () => {
    const list: JSX.Element[] = []
    if (typeof props.account === "string")
      list.push(<Chip key="user" color="primary" icon={<FaceIcon />} label={`...${props.account.slice(-3)}`} />)
    if (typeof props.isAnswered === "boolean" && props.isAnswered === true)
      list.push(<Chip key="isAnswered" color="primary" label="Answered" />)
    if (typeof props.isMember === "boolean" && props.isMember === true)
      list.push(<Chip key="isMember" color="primary" label="Member" />)
    return list
  }

  if (dom().length > 0) {
    return <Box>{dom()}</Box>
  } else {
    return <Box />
  }
} 