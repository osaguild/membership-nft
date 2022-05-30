import { ethers } from "hardhat";
import { expect } from "chai";

describe("NFT.sol", () => {

  let owner: any;
  let user1: any;
  let user2: any;
  let nft: any;

  before(async () => {
    // accounts
    [owner, user1, user2] = await ethers.getSigners();

    // deploy NFT
    const NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy();

  });

  describe("mint", () => {

    before(() => {
      nft.mint(user1.address, "test");
    });

    it("balanceOf user1", async () => {
      expect(await nft.balanceOf(user1.address)).to.equal(1);
    });

    it("balanceOf owner", async () => {
      expect(await nft.balanceOf(owner.address)).to.equal(0);
    });

  });

});

describe("Manager.sol", async function () {

  let owner: any;
  let user1: any;
  let user2: any;
  let nft: any;
  let manager: any;
  let checker: any;

  before(async function () {

    // accounts
    [owner, user1, user2] = await ethers.getSigners();

    // deploy NFT
    const NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy();

    // deploy Manager
    const Manager = await ethers.getContractFactory("Manager");
    manager = await Manager.deploy();

    // deploy Checker
    const Checker = await ethers.getContractFactory("Checker");
    checker = await Checker.deploy(manager.address);

    // set question and answers
    await checker.setQuestion("test1", true);
    await checker.setQuestion("test2", false);
    await checker.setQuestion("test3", true);
    await checker.connect(user1).registAnswers([1, 2, 3], [true, false, true]);
    await checker.connect(user2).registAnswers([1, 2, 3], [true, true, true]);

  });

  describe("add member with collect answer", () => {

    it("addMember", async () => {
      await expect(manager.connect(user1).addMember(nft.address, checker.address, user1.address)).to.emit(nft, "Transfer").withArgs("0x0000000000000000000000000000000000000000", user1.address, 1);
    });

    it("balanceOf owner", async () => {
      expect(await nft.balanceOf(owner.address)).to.equal(0);
    });

    it("balanceOf user1", async () => {
      expect(await nft.balanceOf(user1.address)).to.equal(1);
    });

    it("balanceOf user2", async () => {
      expect(await nft.balanceOf(user2.address)).to.equal(0);
    });

  });

  describe("add member with wrong answer", () => {

    it("addMember", async () => {
      await expect(manager.connect(user2).addMember(nft.address, checker.address, user2.address)).to.be.revertedWith("Answer is wrong");
    });

    it("balanceOf owner", async () => {
      expect(await nft.balanceOf(owner.address)).to.equal(0);
    });

    it("balanceOf user1", async () => {
      expect(await nft.balanceOf(user1.address)).to.equal(1);
    });

    it("balanceOf user2", async () => {
      expect(await nft.balanceOf(user2.address)).to.equal(0);
    });

  });

});

describe("Checker.sol", async function () {

  let owner: any;
  let user1: any;
  let user2: any;
  let manager: any;
  let checker: any;
  const text1 = "Treat everyone with respect. Absolutely no harassment, witch hunting, sexism, racism, or hate speech will be tolerated.";
  const text2 = "No spam or self-promotion (server invites, advertisements, etc) without permission from an admin. This includes DMing fellow members.";
  const answer1 = true;
  const answer2 = false;

  before(async function () {

    // accounts
    [owner, user1, user2] = await ethers.getSigners();

    // deploy Manager
    const Manager = await ethers.getContractFactory("Manager");
    manager = await Manager.deploy();

    // deploy Checker
    const Checker = await ethers.getContractFactory("Checker");
    checker = await Checker.deploy(manager.address);

  });

  describe("before set question", () => {

    it("getCountOfQuestions", async () => {
      expect(await checker.getCountOfQuestions()).to.equal(0);
    });

    it("getQuestion 0", async () => {
      await expect(checker.getQuestion(0)).to.be.revertedWith("Question is not active or out of range");
    });

    it("getQuestion 1", async () => {
      await expect(checker.getQuestion(1)).to.be.revertedWith("Question is not active or out of range");
    });

    it("getQuestion 2", async () => {
      await expect(checker.getQuestion(2)).to.be.revertedWith("Question is not active or out of range");
    });

  });

  describe("set question 1", () => {

    it("setQuestion", async () => {
      await expect(checker.setQuestion(text1, answer1)).to.emit(checker, "QuestionAdded").withArgs(owner.address, 1);
    });

    it("getCountOfQuestions", async () => {
      expect(await checker.getCountOfQuestions()).to.equal(1);
    });

    it("getQuestion 0", async () => {
      await expect(checker.getQuestion(0)).to.be.revertedWith("Question is not active or out of range");
    });

    it("getQuestion 1", async () => {
      expect(await checker.getQuestion(1)).to.equal(text1);
    });

    it("getQuestion 2", async () => {
      await expect(checker.getQuestion(2)).to.be.revertedWith("Question is not active or out of range");
    });

  });

  describe("set question 2", () => {

    it("setQuestion", async () => {
      await expect(checker.setQuestion(text2, answer2)).to.emit(checker, "QuestionAdded").withArgs(owner.address, 2);
    });

    it("getCountOfQuestions", async () => {
      expect(await checker.getCountOfQuestions()).to.equal(2);
    });

    it("getQuestion 0", async () => {
      await expect(checker.getQuestion(0)).to.be.revertedWith("Question is not active or out of range");
    });

    it("getQuestion 1", async () => {
      expect(await checker.getQuestion(1)).to.equal(text1);
    });

    it("getQuestion 2", async () => {
      expect(await checker.getQuestion(2)).to.equal(text2);
    });

  });

  describe("regist answers", () => {

    it("empty ids", async () => {
      await expect(checker.registAnswers([], [true, false])).to.be.revertedWith("Format check error");
    });

    it("empty answers", async () => {
      await expect(checker.registAnswers([1, 2], [])).to.be.revertedWith("Format check error");
    });

    it("different length of ids and answers", async () => {
      await expect(checker.registAnswers([1], [true, false])).to.be.revertedWith("Format check error");
    });

    it("not enouth answers", async () => {
      await expect(checker.registAnswers([2], [false])).to.be.revertedWith("Active answer check error");
    });

    it("too much answers", async () => {
      await expect(checker.registAnswers([1, 2, 3], [true, false, true])).to.be.revertedWith("Answer check error");
    });

    it("collect answers", async () => {
      await expect(checker.connect(user1).registAnswers([1, 2], [true, false])).to.emit(checker, "AnswerAdded").withArgs(user1.address);
    });

    it("wrong answers", async () => {
      await expect(checker.connect(user2).registAnswers([1, 2], [true, true])).to.emit(checker, "AnswerAdded").withArgs(user2.address);
    });

  });

  describe("check answers", () => {

    it("call from onwer", async () => {
      await expect(checker.connect(owner).checkAnswers(user1.address)).to.be.revertedWith("Only manager can call this function");
    });

  });

});