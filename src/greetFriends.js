const fs = require("fs");

const readFriendsList = require("../src/readFriendsList");

const greetFriends = (filePath) => {
  const friendsList = readFriendsList(filePath);
  var birthdayList = [];

  friendsList.forEach((friend) => {
  
    let date_ob = new Date();

    const friendsDOB = friend.dateOfBirth.slice(5, 10);
    currentDateString = date_ob.toISOString().slice(5, 10);

    if (friendsDOB === currentDateString) {
      birthdayList.push(friend.email);
    }
  });
  return birthdayList;
};

module.exports = { greetFriends };
