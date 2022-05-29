import { ethers } from "hardhat";
import { expect } from "chai";

describe("NFT.sol", async function () {

  let owner: any;
  let user1: any;
  let user2: any;
  let nft: any;

  before(async function () {
    // accounts
    [owner, user1, user2] = await ethers.getSigners();

    // deploy NFT
    const NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy();

  });

  it("mint", async function () {

    // mint and check balance
    nft.mint(user1.address, "test");
    expect(await nft.balanceOf(user1.address)).to.equal(1);
    expect(await nft.balanceOf(owner.address)).to.equal(0);

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

  it("add member", async function () {

    // mint and check balance
    manager.addMember(nft.address, user1.address);
    expect(await nft.balanceOf(user1.address)).to.equal(1);
    expect(await nft.balanceOf(owner.address)).to.equal(0);

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

  it("before set question", async function () {

    // count of question
    expect(await checker.getCountOfQuestions()).to.equal(0);

    // question 0
    await expect(checker.getQuestion(0)).to.be.revertedWith("Question is not active or out of range");

    // question 1
    await expect(checker.getQuestion(1)).to.be.revertedWith("Question is not active or out of range");

    // question 2
    await expect(checker.getQuestion(2)).to.be.revertedWith("Question is not active or out of range");

  });

  it("set question 1", async function () {

    // set question
    await expect(checker.setQuestion(text1, answer1)).to.emit(checker, "QuestionAdded").withArgs(owner.address, 1);

    // count of question
    expect(await checker.getCountOfQuestions()).to.equal(1);

    // question 0
    await expect(checker.getQuestion(0)).to.be.revertedWith("Question is not active or out of range");

    // question 1
    expect(await checker.getQuestion(1)).to.equal(text1);

    // question 2
    await expect(checker.getQuestion(2)).to.be.revertedWith("Question is not active or out of range");

  });

  it("set question 2", async function () {

    // set question
    await expect(checker.setQuestion(text2, answer2)).to.emit(checker, "QuestionAdded").withArgs(owner.address, 2);

    // count of question
    expect(await checker.getCountOfQuestions()).to.equal(2);

    // question 0
    await expect(checker.getQuestion(0)).to.be.revertedWith("Question is not active or out of range");

    // question 1
    expect(await checker.getQuestion(1)).to.equal(text1);

    // question 2
    expect(await checker.getQuestion(2)).to.equal(text2);

  });

  it("regist answers", async function () {

    // empty ids
    const ids0: number[] = [];
    const answers0: boolean[] = [true, false];
    await expect(checker.registAnswers(ids0, answers0)).to.be.revertedWith("Format check error");

    // empty answers
    const ids1: number[] = [1, 2];
    const answers1: boolean[] = [];
    await expect(checker.registAnswers(ids1, answers1)).to.be.revertedWith("Format check error");

    // length of ids and answers are different
    const ids2: number[] = [1];
    const answers2: boolean[] = [true, false];
    await expect(checker.registAnswers(ids2, answers2)).to.be.revertedWith("Format check error");

    // wrong answer
    const ids3: number[] = [1, 2];
    const answers3: boolean[] = [true, true];
    await expect(checker.registAnswers(ids3, answers3)).to.be.revertedWith("Answer check error");

    // not enouth answers
    const ids4: number[] = [2];
    const answers4: boolean[] = [false];
    await expect(checker.registAnswers(ids4, answers4)).to.be.revertedWith("Active answer check error");

    // too much answers
    const ids5: number[] = [1, 2, 3];
    const answers5: boolean[] = [true, false, true];
    await expect(checker.registAnswers(ids5, answers5)).to.be.revertedWith("Answer check error");

    // collect answer
    const ids6: number[] = [1, 2];
    const answers6: boolean[] = [true, false];
    await expect(checker.registAnswers(ids6, answers6)).to.emit(checker, "AnswerAdded").withArgs(owner.address);

  });

});