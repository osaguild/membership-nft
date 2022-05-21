import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("deploying contract with the account:", deployer.address);
  console.log("account balance:", (await deployer.getBalance().toString()));
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();
  console.log("NFT address:", nft.address);
  const Manager = await ethers.getContractFactory("Manager");
  const manager = await Manager.deploy();
  console.log("Manager address:", manager.address);
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