
const sinon = require("sinon");
const { assert } = require("chai");
const { fake } = require("sinon");
const fs = require("fs");
const { readFriendsList } = require("../src/readFriendsList");
const { greetFriends } = require("../src/greetFriends");
const { mailFriends } = require("../src/mailFriends");

const friends = [
  {
    firstName: "yash",
    lastName: "mehta",
    dateOfBirth: "1995-03-09",
    email: "yash.ne@gmail.com",
  },

  {
    firstName: "vinay",
    lastName: "solanki",
    dateOfBirth: "2021-07-06",
    email: "vinay.solanki@ymail.com",
  },
];

describe("Friends Store", () => {
  it("Should throw an exception if no file path is passed", () => {
    assert.throws(
      () => readFriendsList(),
      "No File Path Specified"
    );
  });

  it("Should throw an exception if file path is invalid", () => {
    assert.throws(
      () => readFriendsList("friendsList.json"),
      "Not a valid path"
    );
  });

  it("Should return list of all friends", () => {
    const fake_ReadFileSync = sinon.fake.returns(friends);
    sinon.replace(fs, "readFileSync", fake_ReadFileSync);
    const result = readFriendsList("./files/friendsList.json");
    assert.isArray(result);
    assert.equal(result.length, friends.length);
    assert.isTrue(fake_ReadFileSync.calledOnce);
  });
});

describe("Greet Friends", () => {
  it("Should call readFriendLists function once", () => {
    const fake_readAllFriends = sinon.fake.returns([]);
    sinon.replace(readFriendsList, "readFriendsList", fake_readAllFriends);

    const result = greetFriends();
    sinon.restore();

    assert.isTrue(fake_readAllFriends.calledOnce);
  });

  it("Should greet friends if friend's birth date matches with current date", () => {
    const fake_readAllFriends = sinon.fake.returns(friends);
    sinon.replace(readFriendsList, "readAllFriends", fake_readAllFriends);
    const result = greetFriends();
    sinon.restore();
    assert.isNotNull(result);
  });
});

describe("Mail Service", () => {
  it("Call the greetAllFriends", () => {
    const fake_greetAllFriends = sinon.fake.returns([]);
    sinon.replace(greetFriends, "greetAllFriends", fake_greetAllFriends);
    const result = mailFriends();
    sinon.restore();
    assert.isTrue(fake_greetAllFriends.calledOnce);
  });

  it("Should mail to all the friends using the list returned by greetAllFriends", () => {
    const mails = ["abcdef@gmail.com"];
    const fake_greetAllFriends = sinon.fake.returns(mails);
    sinon.replace(greetFriends, "greetFriends", fake_greetAllFriends);
    const result = mailFriends();
    sinon.restore();
    assert.isNotNull(result);
  });
});
