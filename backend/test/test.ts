import { ethers } from "hardhat";
import { expect } from "chai";

describe("ALL", async function () {

  let owner: any;
  let user1: any;
  let user2: any;
  let nft: any;
  let manager: any;
  let checker: any;

  before(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy();
    const Manager = await ethers.getContractFactory("Manager");
    manager = await Manager.deploy();
    const Checker = await ethers.getContractFactory("Checker");
    checker = await Checker.deploy();
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

  it("question 1", async function () {
    expect(await checker.getQuestion(0)).to.equal("Treat everyone with respect. Absolutely no harassment, witch hunting, sexism, racism, or hate speech will be tolerated.");
    expect(await checker.checkAnswer(0, true)).to.equal(true);
    expect(await checker.checkAnswer(0, false)).to.equal(false);
  });

  it("question 2", async function () {
    expect(await checker.getQuestion(1)).to.equal("No spam or self-promotion (server invites, advertisements, etc) without permission from an admin. This includes DMing fellow members.");
    expect(await checker.checkAnswer(1, true)).to.equal(true);
    expect(await checker.checkAnswer(1, false)).to.equal(false);
  });

});