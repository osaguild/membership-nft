import { ethers } from "hardhat";

async function main() {
  const MANAGER_CONTRACT_ADDRESS = "0xb56C95b00fcc2FE919e9bd277B4D16af0fa65B8D";
  // deploy
  const [deployer] = await ethers.getSigners();
  console.log("deploying contract with the account:", deployer.address);
  console.log("account balance:", (await deployer.getBalance().toString()));
  const Checker = await ethers.getContractFactory("Checker");
  const checker = await Checker.deploy(MANAGER_CONTRACT_ADDRESS);
  console.log("Checker address:", checker.address);
  // set questions
  await checker.setQuestion("Treat everyone with respect. Absolutely no harassment, witch hunting, sexism, racism, or hate speech will be tolerated.", true);
  await checker.setQuestion("No spam or self-promotion (server invites, advertisements, etc) without permission from an admin. This includes DMing fellow members.", true);
  const q1 = await checker.getQuestion(1);
  console.log("q1:", q1);
  const q2 = await checker.getQuestion(2);
  console.log("q2:", q2);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });