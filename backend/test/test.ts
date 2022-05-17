import { ethers } from "hardhat";
import { expect } from"chai";

describe("MenberShipNFT.sol", function () {
  it("sample test", async function () {
    const [owner] = await ethers.getSigners();
    const MemberShipNFT = await ethers.getContractFactory("MemberShipNFT");
    const nft = await MemberShipNFT.deploy();
    await nft.mint("test");
    expect(await nft.balanceOf(owner.address)).to.equal(1);
  });
});