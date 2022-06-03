import { checkSignature, isMember } from './web3';

const KEYWORD = "hello osaguild";
const MEMBER_TOKEN = "member";
const NON_MEMBER_TOKEN = "non-member";

export function getKeyword(): string {
  return KEYWORD;
}

export async function authN(signature: string, address: string): Promise<string | undefined> {
  if (!await checkSignature(KEYWORD, signature)) { return undefined; };
  return (await isMember(address) === true) ? MEMBER_TOKEN : NON_MEMBER_TOKEN;
}

export function authR(token: string, path: string): boolean {
  if (token === MEMBER_TOKEN) { return true; }
  else if (token === NON_MEMBER_TOKEN) {
    if (path === "/") { return true; }
  }
  return false;
}