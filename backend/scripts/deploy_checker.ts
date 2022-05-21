import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("deploying contract with the account:", deployer.address);
  console.log("account balance:", (await deployer.getBalance().toString()));
  const Checker = await ethers.getContractFactory("Checker");
  const checker = await Checker.deploy();
  console.log("Checker address:", checker.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });