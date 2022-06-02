import { useRouter } from "next/router";

export default function Member() {
  const router = useRouter();
  console.log("props:",router.query.name);
  return (
    <div>
      member only
    </div>
  )
}