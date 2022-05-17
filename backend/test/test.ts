import { ethers } from "hardhat";
import { expect } from "chai";

describe("MenberShipNFT.sol", async function () {

  let owner: any;
  let user1: any;
  let user2: any;
  let nft: any;
  let manager: any;

  before(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy();
    const Manager = await ethers.getContractFactory("Manager");
    manager = await Manager.deploy();
  });

  it("mint", async function () {
    await nft.mint(user1.address, "test");
    expect(await nft.balanceOf(user1.address)).to.equal(1);
    expect(await nft.balanceOf(owner.address)).to.equal(0);
  });

  it("mint from Manager", async function () {
    await nft.setApprovalForAll(manager.address, true);
    await manager.addMember(nft.address, user1.address);
    expect(await nft.balanceOf(user1.address)).to.equal(2);
    expect(await nft.balanceOf(owner.address)).to.equal(0);
  });
});