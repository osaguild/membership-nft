import { ethers } from "hardhat";
import { expect } from"chai";

describe("MenberShip.sol", function () {
  it("sample test", async function () {
    const [owner] = await ethers.getSigners();
    const MemberShip = await ethers.getContractFactory("MemberShip");
    const memberShipToken = await MemberShip.deploy();
    await memberShipToken.mint("test");
    expect(await memberShipToken.balanceOf(owner.address)).to.equal(1);
  });
});