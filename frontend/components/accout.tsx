import { Chip } from "@mui/material"
import FaceIcon from "@mui/icons-material/Face"

export default function Account(props: any) {

  const dom = () => {
    const list = []
    if (typeof props.account === "string")
      list.push(<Chip key="user" icon={<FaceIcon />} label={`...${props.account.slice(-3)}`} />)
    if (typeof props.isAnswered === "boolean" && props.isAnswered === true)
      list.push(<Chip key="isAnswered" label="Answered" />)
    if (typeof props.isMember === "boolean" && props.isMember === true)
      list.push(<Chip key="isMember" label="Member" />)
    return list
  }

  return dom().length === 0
    ? <div>Error</div>
    : <div>{dom()}</div>
} 