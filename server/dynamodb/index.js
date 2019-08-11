const PersonalAccount = require('./personalAccount.js');
require('dotenv').config();


// yo maybe fix this at some point
class DynamoDb {
  constructor(data) {
    this.personalAccount = new PersonalAccount(
      {
        accessKeyId: process.env.DYNAMOACCESS,
        secretAccessKey: process.env.DYNAMOSECRET,
        region: 'us-east-1',
      },
      () => {}
    );
    return this.personalAccount;
  }
}

module.exports = DynamoDb;
