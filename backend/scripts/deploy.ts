import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("deploying contract with the account:", deployer.address);
  console.log("account balance:", (await deployer.getBalance().toString()));
  const MemberShipNFT = await ethers.getContractFactory("MemberShipNFT");
  const nft = await MemberShipNFT.deploy();
  console.log("token address:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });