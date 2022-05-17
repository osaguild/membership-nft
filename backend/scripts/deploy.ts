import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("deploying contract with the account:", deployer.address);
  console.log("account balance:", (await deployer.getBalance().toString()));
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();
  const Manager = await ethers.getContractFactory("Manager");
  const manager = await Manager.deploy();
  console.log("NFT address:", nft.address);
  console.log("Manager address:", manager.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });