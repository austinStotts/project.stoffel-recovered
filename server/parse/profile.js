
// test to see if user is 18 years or older
const age = dob => {
  console.log(dob);
  return new Date(dob["year"] + 18, dob["month"] - 1, dob["day"]) <= new Date();
};

// test to see if the account is older than 1.5 years
const account = registration => {
  console.log(registration);
  return new Date(registration * 1000 + 47304000000) <= new Date();
};

// test to see if the account has been used on mobile and desktop
const accountActivity = array => {
//  console.log(array);
  let mobile = false;
  let desktop = false;
  for (let i = 0; i < array.length; i++) {
    if (
      array[i].user_agent.includes("iPhone") ||
      array[i].user_agent.includes("Android")
    ) {
      mobile = true;
    } else if (
      array[i].user_agent.includes("Windows") ||
      array[i].user_agent.includes("Macintosh")
    ) {
      desktop = true;
    }

    if (mobile === true && desktop === true) {
      return true;
    }
  }
  return false;
};

// test to see if password has changed in the last 30 days
const passwordHistory = array => {
  //console.log(array);
  for (let i = 0; i < array.length; i++) {
    if (array[i]["event"] === "Password Change") {
      if (
        new Date(array[i]["event"]["created_timestamp"] * 1000 + 2592000000) >
        new Date()
      ) {
        return false;
      }
    }
  }
  return true;
};

module.exports = { 
  age: age, 
  account: account, 
  accountActivity: accountActivity, 
  passwordHistory: passwordHistory 
}
