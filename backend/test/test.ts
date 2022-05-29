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

  before(async function () {

    // accounts
    [owner, user1, user2] = await ethers.getSigners();

    // deploy NFT
    const NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy();

    // deploy Manager
    const Manager = await ethers.getContractFactory("Manager");
    manager = await Manager.deploy();

  });

  describe("add member", () => {

    before(() => {
      manager.addMember(nft.address, user1.address);
    });

    it("balanceOf user1", async () => {
      expect(await nft.balanceOf(user1.address)).to.equal(1);
    });

    it("balanceOf owner", async () => {
      expect(await nft.balanceOf(owner.address)).to.equal(0);
    });

  });

});


describe("Checker.sol", async function () {

  let owner: any;
  let user1: any;
  let user2: any;
  let checker: any;
  const text1 = "Treat everyone with respect. Absolutely no harassment, witch hunting, sexism, racism, or hate speech will be tolerated.";
  const text2 = "No spam or self-promotion (server invites, advertisements, etc) without permission from an admin. This includes DMing fellow members.";
  const answer1 = true;
  const answer2 = false;

  before(async function () {

    // accounts
    [owner, user1, user2] = await ethers.getSigners();

    // deploy Checker
    const Checker = await ethers.getContractFactory("Checker");
    checker = await Checker.deploy();

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

  describe("check wrong answers", () => {

    it("collect answers", async () => {
      await expect(checker.connect(user2).checkAnswers());
    });

    it("wrong answers", async () => {
      await expect(checker.connect(user1).checkAnswers()).to.be.revertedWith("Answer is wrong");
    });

  });
});