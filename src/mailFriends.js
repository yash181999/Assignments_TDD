const { greetFriends } = require("./greetFriends");

function mailFriends(filePath) {
  const friendsToMail = greetFriends(filePath);
  friendsToMail.forEach(friend => mailTo(friend));
}

function mailTo(email) {

  console.log("E-mail sent To : " + email);
}

module.exports = { mailFriends };
