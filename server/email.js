const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID);

const sendInitial = data => {
  console.log('\n\nEMAIL DATA');
  console.log(data);
  console.log('\n* * * * * * * * * * *\n');
  const { fbEmail, personalAccountID } = data;
  console.log(fbEmail, "fbemail");
  let userURL = `synctools.net/user/${personalAccountID}`;

  const msg = {
    from: 'account.mail@synctools.net', // sender address
    to: fbEmail, // list of receivers---------
    subject: "Your Secret Facebook Link", // Subject line
    text: userURL, // plain text body--------
    html: `
    <h3>Thank You for Signing Up!</h3>
    <h4>Use the link below, to go back to your account set up:<h4>
    <b>${userURL}</b>
    <br>
    <p>thanks,</p>
    <p>synctools team</p>
    `
  };
  sgMail.send(msg)
  .then(response => console.log('sent init email'))
  .catch(err => {
    console.log('there has been an error sending init email');
    console.log(err);
  })
};

const sendResults = data => {
  console.log(data, " <- data entering email");
  const { fbEmail, testResults } = data;
  const bool =
    testResults.multipleUse &&
    testResults.userAge &&
    testResults.passwordChange &&
    testResults.accountAge;

  //to finish
  console.log(fbEmail, testResults, bool);
  const msg = {
    from: '"Honey Pirate 👻" <nice.try420@gmail.com>', // sender address
    to: fbEmail, // list of receivers---------
    subject: "Your Test Results!", // Subject line
    text: "Test Results", // plain text body--------
    html: `<div>
    <b>Here is your test results: ${bool ? "PASS" : "FAIL"} </b>
    <table style="height: 72px; width: 100%; border-collapse: collapse;" border="2" cellpadding="8">
    <tbody>
    <tr style="height: 18px;">
    <td style="width: 50%; height: 18px;">Age of User over 18 years</td>
    <td style="width: 50%; height: 18px;">${
      testResults.userAge ? "&#10004;" : "&#10060;"
    } </td>
    </tr>
    <tr style="height: 18px;">
    <td style="width: 50%; height: 18px;">Age of Account over 1.5 years</td>
    <td style="width: 50%; height: 18px;">${
      testResults.accountAge ? "&#10004;" : "&#10060;"
    }</td>
    </tr>
    <tr style="height: 18px;">
    <td style="width: 50%; height: 18px;">Facebook used by Mobile device and Desktop</td>
    <td style="width: 50%; height: 18px;">${
      testResults.multipleUse ? "&#10004;" : "&#10060;"
    }</td>
    </tr>
    <tr style="height: 18px;">
    <td style="width: 50%; height: 18px;">Password unchanged in last 30 days</td>
    <td style="width: 50%; height: 18px;">${
      testResults.passwordChange ? "&#10004;" : "&#10060;"
    }</td>
    </tr>
    </tbody>
    </table>
    </div>` // html body
  };
  sgMail.send(msg);
};

module.exports = { sendInitial, sendResults };
