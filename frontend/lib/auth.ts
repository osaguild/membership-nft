import { checkSignature, isMemberAccount } from './web3';

const KEYWORD = "hello osaguild"

export function getKeyword(): string {
  return KEYWORD;
}

export async function authN(signature: string, address: string): Promise<Token | undefined> {
  try {
    if (!await checkSignature(KEYWORD, signature)) { return undefined }
    return (await isMemberAccount(address) === true) ? "MEMBER_TOKEN" : "NON_MEMBER_TOKEN"  
  } catch (error) {
    console.log("auth.authN() is failed", error)
    return undefined;
  }
}

export function authR(token: Token, path: Path): boolean {
  switch (path) {
    case "/":
      switch (token) {
        case "MEMBER_TOKEN": return true
        case "NON_MEMBER_TOKEN": return true
      }
    case "/member":
      switch (token) {
        case "MEMBER_TOKEN": return true
        case "NON_MEMBER_TOKEN": return false
      }
  }
}