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
    const [isCollectId0, data0] = await checker.getQuestion(0);
    expect(isCollectId0).to.equal(false);
    expect(data0).to.equal("Question is not active or out of range");

    // question 1
    const [isCollectId1, data1] = await checker.getQuestion(1);
    expect(isCollectId1).to.equal(false);
    expect(data1).to.equal("Question is not active or out of range");

    // question 2
    const [isCollectId2, data2] = await checker.getQuestion(2);
    expect(isCollectId2).to.equal(false);
    expect(data2).to.equal("Question is not active or out of range");

  });

  it("set question 1", async function () {

    // set question
    await expect(checker.setQuestion(text1, answer1)).to.emit(checker, "QuestionAdded").withArgs(owner.address, 1);

    // count of question
    expect(await checker.getCountOfQuestions()).to.equal(1);

    // question 0
    const [isCollectId0, data0] = await checker.getQuestion(0);
    expect(isCollectId0).to.equal(false);
    expect(data0).to.equal("Question is not active or out of range");

    // question 1
    const [isCollectId1, data1] = await checker.getQuestion(1);
    expect(isCollectId1).to.equal(true);
    expect(data1).to.equal(text1);

    // question 2
    const [isCollectId2, data2] = await checker.getQuestion(2);
    expect(isCollectId2).to.equal(false);
    expect(data2).to.equal("Question is not active or out of range");

  });

  it("set question 2", async function () {

    // set question
    await expect(checker.setQuestion(text2, answer2)).to.emit(checker, "QuestionAdded").withArgs(owner.address, 2);

    // count of question
    expect(await checker.getCountOfQuestions()).to.equal(2);

    // question 0
    const [isCollectId0, data0] = await checker.getQuestion(0);
    expect(isCollectId0).to.equal(false);
    expect(data0).to.equal("Question is not active or out of range");

    // question 1
    const [isCollectId1, data1] = await checker.getQuestion(1);
    expect(isCollectId1).to.equal(true);
    expect(data1).to.equal(text1);

    // question 2
    const [isCollectId2, data2] = await checker.getQuestion(2);
    expect(isCollectId2).to.equal(true);
    expect(data2).to.equal(text2);

  });

  it("check answers", async function () {

    // empty ids
    const ids0: number[] = [];
    const answers0: boolean[] = [true, false];
    const [isCollect0, message0] = await checker.checkAnswers(ids0, answers0);
    expect(isCollect0).to.equal(false);
    expect(message0).to.equal("Format is wrong");

    // empty answers
    const ids1: number[] = [1, 2];
    const answers1: boolean[] = [];
    const [isCollect1, message1] = await checker.checkAnswers(ids1, answers1);
    expect(isCollect1).to.equal(false);
    expect(message1).to.equal("Format is wrong");

    // length of ids and answers are different
    const ids2: number[] = [1];
    const answers2: boolean[] = [true, false];
    const [isCollect2, message2] = await checker.checkAnswers(ids2, answers2);
    expect(isCollect2).to.equal(false);
    expect(message2).to.equal("Format is wrong");

    // wrong answer
    const ids3: number[] = [1, 2];
    const answers3: boolean[] = [true, true];
    const [isCollect3, message3] = await checker.checkAnswers(ids3, answers3);
    expect(isCollect3).to.equal(false);
    expect(message3).to.equal("Answer is wrong");

    // not enouth answers
    const ids4: number[] = [2];
    const answers4: boolean[] = [false];
    const [isCollect4, message4] = await checker.checkAnswers(ids4, answers4);
    expect(isCollect4).to.equal(false);
    expect(message4).to.equal("You have not answered all active questions");

    // too much answers
    const ids5: number[] = [1, 2, 3];
    const answers5: boolean[] = [true, false, true];
    const [isCollect5, message5] = await checker.checkAnswers(ids5, answers5);
    expect(isCollect5).to.equal(true);
    expect(message5).to.equal("Correct answer");

    // collect answer
    const ids6: number[] = [1, 2];
    const answers6: boolean[] = [true, false];
    const [isCollect6, message6] = await checker.checkAnswers(ids6, answers6);
    expect(isCollect6).to.equal(true);
    expect(message6).to.equal("Correct answer");

  });

  it("set answers", async function () {

    // empty ids
    const ids0: number[] = [];
    const answers0: boolean[] = [true, false];
    await expect(checker.setAnswers(ids0, answers0)).to.be.revertedWith("Format is wrong");


    // empty answers
    const ids1: number[] = [1, 2];
    const answers1: boolean[] = [];
    await expect(checker.setAnswers(ids1, answers1)).to.be.revertedWith("Format is wrong");

    // length of ids and answers are different
    const ids2: number[] = [1];
    const answers2: boolean[] = [true, false];
    await expect(checker.setAnswers(ids2, answers2)).to.be.revertedWith("Format is wrong");

    // collect answer
    const ids3: number[] = [1, 2];
    const answers3: boolean[] = [true, false];
    await expect(checker.setAnswers(ids3, answers3)).to.emit(checker, "AnswerAdded").withArgs(owner.address);

  });

});