const express = require('express');
const bodyParser = require('body-parser');
const Axios = require('axios');
const path = require('path');
const app = express();
const parse = require('./parse/parse');
const rp = require('request-promise');
const moment = require('moment-timezone');
const m = require('moment');
const uuid = require('uuidv4');
const AWS = require('aws-sdk');
const config = require('./config/config.js');
const email = require('./email.js');
require('dotenv').config();

const { cookieCompare } = require('tough-cookie');

const mlaToken = process.env.MLA_TOKEN;
const proxyAddress = process.env.PROXY_ADDRESS;
const proxyPort = process.env.PROXY_PORT;
const proxyUsername = process.env.PROXY_USERNAME;
const proxyPass = process.env.PROXY_PASS;
const port = process.env.PORT || 3000;

app.timeout = 360000;
app.use(
  bodyParser.json({
    limit: '50mb',
  })
);
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  })
);
app.enable('trust proxy');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.static('dist'));

//DynamoDB
AWS.config.update(config.aws_remote_config);
const PersonalAccount = require('./dynamodb/personalAccount');
const personalAccount = new PersonalAccount(
  {
    accessKeyId: process.env.ACCESS,
    secretAccessKey: process.env.SECRET,
    region: 'us-east-1',
  },
  re => {}
);

// GET a personalAccount by personalAccountID
app.get('/api/personal', (req, res, next) => {
  console.log(
    'req.query.personalAccountID in GET /api/personal: ',
    req.query.personalAccountID
  );
  let personalAccountID = req.query.personalAccountID;

  personalAccount
    .get(personalAccountID)
    .then(rez => {
      console.log('res in the api/personal GET endpoint => ', rez);
      res.status(200).json(rez);
    })
    .catch(err => {
      if (err) {
        console.log('err => ', err);
        res
          .status(500)
          .send('There was a problem GETting the userInfo from the db');
      }
    });
});

// Add a user to DynamoDB | should only be used to invite users
app.post('/api/personal/add', (req, res, next) => {
  console.log('req.body in /api/personal/add: ', req.body);
  const {
    fbEmail,
    firstName,
    lastName,
    source,
    phone,
  } = req.body;

  const personalAccountID = uuid();
  const status = 'invited';
  const invitedAt = `${m().format('MM/DD/YYYY HH:mm:ss')}`;
  const payment = 0;

  personalAccount
    .query('fbEmail', fbEmail)
    .then(items => {
      if (!items.length) {
        personalAccount
          .create({
            personalAccountID,
            fbEmail,
            firstName,
            lastName,
            source,
            phone,
            status,
            invitedAt,
            payment,
          })
          .then(rez => {
            console.log(
              'res in the api/personal/add POST endpoint after adding personalAccount in db => ',
              rez.attrs
            );
            res.status(200).json(rez.attrs);
          })
          .catch(err => {
            if (err) {
              console.log('err => ', err);
              res
                .status(500)
                .send(
                  'There was a problem adding the personalAccount in the db'
                );
            }
          });
      } else {
        res.status(400).send('Record already exists with this Facebook Email. Please double check the Email and try again');
      }
    })
    .catch(err =>
      console.log('error updating personalAccount record with MLA data: ' + err)
    );
});

//Add new MLA profile and update record in DynamoDB
app.post('/api/personal/add/mla', (req, res) => {
  console.log(
    'api/personal/add/mla API  Endpoint getting hit! Time: ',
    moment().format('YYYY-MM-DDTHH:mm:ss'),
    ' | req.body => ',
    req.body
  );

  const {
    personalAccountID,
    fbEmail,
    firstName,
    lastName,
    OS,
    userAgent,
    language,
    resolution,
    platform,
    source,
    fbProfileURL,
    phone,
  } = req.body;

  let mlaData = {
    name: fbEmail,
    browser: 'mimic',
    os: OS,
    navigator: {
      userAgent: userAgent,
      resolution: resolution,
      language: language,
      platform: platform,
    },
    storage: {
      local: true,
      extensions: true,
      bookmarks: true,
      history: true,
      passwords: true,
    },
    network: {
      proxy: {
        type: 'HTTP',
        host: proxyAddress,
        port: proxyPort,
        username: proxyUsername,
        password: proxyPass,
      },
    },
  };
  console.log('mlaData: ', mlaData);

  const reqOptions = {
    method: 'POST',
    uri: `https://api.multiloginapp.com/v2/profile`,
    qs: {
      token: mlaToken,
    },
    body: mlaData,
    json: true,
  };

  //make mla profile
  rp(reqOptions)
    .then(multiloginID => {
      console.log('**********multiloginID************: ', multiloginID);

      //go get all the MLA details
      rp({
        method: 'GET',
        uri: `https://api.multiloginapp.com/v1/profile/get-data`,
        qs: {
          token: mlaToken,
          profileId: multiloginID.uuid,
        },
      })
        .then(mlData => {
          //Add new account in Dynamo using multiloginID as the UUID
          console.log('mlData: ', mlData);
          let multiloginDetails = JSON.parse(mlData);
          let status = 'mlaProfileCreated';
          let cookies = {};
          let fbPass = '';

          let dynamoData = {
            personalAccountID,
            fbEmail,
            firstName,
            lastName,
            OS,
            userAgent,
            language,
            resolution,
            platform,
            source,
            fbProfileURL,
            phone,
            multiloginDetails,
            status,
            cookies,
            fbPass,
          };
          dynamoData.multiloginID = multiloginID.uuid;

          console.log('dynamoData: ', dynamoData);

          personalAccount.query('fbEmail', fbEmail).then(acc => {
            console.log('acc => ', acc);
            const { personalAccountID } = acc[0].attrs;
            dynamoData.personalAccountID = personalAccountID;
            personalAccount
              .update(dynamoData)
              .then(rez => {
                console.log(
                  'res in the api/proxy POST endpoint after making proxy in dynamodb => ',
                  rez.attrs
                );
                res
                  .status(200)
                  .send(
                    `New record created in dynamodb => ${JSON.stringify(
                      rez.attrs
                    )}`
                  );
              })
              .catch(err => {
                if (err) {
                  console.log('err => ', err);
                }
              });
          });
        })
        .catch(err => console.log('error fetching MLA profile data: ' + err));
    })
    .catch(err => console.log('error making MLA profile: ' + err));
});

// Update a personalAccount by personalAccountID
app.put('/api/personal/update', (req, res, next) => {
  console.log('req.body in /api/personal/update: ', req.body);
  console.log('GOT THE MOTHER FUCKING REQUEST');
  personalAccount
    .update(req.body)
    .then(rez => {
      console.log(
        'res in the api/personal/update PUT endpoint after updating personalAccount in dynamodb => ',
        rez.attrs
      );
      res.status(200).send(`Record was updated in the dynamodb`);
    })
    .catch(err => {
      if (err) {
        console.log('err => ', err);
        res
          .status(500)
          .send('There was a problem updating the userInfo in the db');
      }
    });
});

// Update fbInfo by personalAccountID
app.put('/api/personal/update/fbInfo', (req, res, next) => {
  console.log('req.body in /api/personal/update/fbInfo: ', req.body);
  const { fbEmail, fbPass, cookies, status } = req.body;
  let newCookies = cookies.sort(cookieCompare);
  let cookieBlob = {};

  //build new acceptable cookie blob
  newCookies.forEach(newCookie => {
    if (newCookie.name.length) {
      cookieBlob[newCookie.name] = newCookie;
    }
  });
  personalAccount.query('fbEmail', fbEmail).then(acc => {
    console.log('acc => ', acc);
    const { personalAccountID } = acc[0].attrs;
    const updateData = {
      personalAccountID,
      fbEmail,
      fbPass,
      status,
      cookies: cookieBlob,
    };

    personalAccount
      .update(updateData)
      .then(rez => {
        console.log(
          'res in the api/personal/update PUT endpoint after updating personalAccount in dynamodb => ',
          rez.attrs
        );
        res.status(200).send(`Record was updated in the dynamodb`);
      })
      .catch(err => {
        if (err) {
          console.log('err => ', err);
          res
            .status(500)
            .send('There was a problem updating the userInfo in the db');
        }
      });
  });
});

// Update a personalAccount's cookies by fbEmail
app.put('/api/personal/update/cookies', (req, res, next) => {
  const { fbEmail, cookies, info } = req.body;
  let newCookies = cookies.sort(cookieCompare);
  let cookieBlob = {};

  personalAccount.query('fbEmail', fbEmail).then(acc => {
    console.log('acc => ', acc);
    if (acc.length) {
      const {
        personalAccountID,
        firstName,
        lastName,
        phone,
        source,
        fbEmail,
        fbPass,
        multiloginID,
      } = acc[0].attrs;

      newCookies.forEach(newCookie => {
        if (newCookie.name.length) {
          cookieBlob[newCookie.name] = newCookie;
        }
      });
      personalAccount
        .update({
          personalAccountID,
          firstName,
          lastName,
          phone,
          source,
          fbEmail,
          fbPass,
          multiloginID,
          cookies: cookieBlob,
        })
        .then(updateRes => {
          console.log('updateRes.attrs => ', updateRes.attrs);
          res.status(200).send(`cookies updated in the db`);
        })
        .catch(err => {
          if (err) {
            console.log('err => ', err);
            res
              .status(500)
              .send('There was a problem updating the cookies in the db');
          }
        });
    }
  });
});

app.post('/api/dashboard/login', (req, res) => {
  // ** ** ** ** ** ** ** ** ** ** ** ** **
  // THIS IS THE MASTER USERNAME / PASSWORD
  const u = 'admin';
  const p = 'kC3Ts&7Ef5C3';

  if(req.body.username === u && req.body.password === p) {
    res.status(200).send({ pass: true });
  } else {
    res.status(400).send({ pass: false });
  }
  // ** ** ** ** ** ** ** ** ** ** ** ** **
}) 

// get one user by email address from DynamoDB
app.post('/api/dashboard/user', (req, res) => {
  personalAccount.query('fbEmail', req.body.email)
  .then(response => res.send(response))
  .catch(error => console.log(error));
});

// get one user by personal account id from DynamoDB
app.post('/api/dashboard/user/id', (req, res) => {
  personalAccount.query('personalAccountID', req.body.id)
  .then(response => res.send(response))
  .catch(error => console.log(error));
});

// get all user data from DynamoDB
app.get('/api/dashboard/all/users', (req, res) => {
  personalAccount.getAll()
  .then(response => res.send(response))
  .catch(error => console.log(error));
});

// dont delete the user just hide them...
app.post('/api/delete/user', (req, res) => {
  console.log('\nClient requesting to delete user:', req.body.paid);
  personalAccount.delete(req.body.paid)
  .then(response => {
    console.log('\n DATA DATA DATA');
    console.log(response);
    res.status(200).send(response);
  })
  .catch(error => {
    console.log('\nERROR ERROR ERROR');
    console.log(error);
    res.status(503).send(error);
  })
})

// app.post('/file/upload/*', upload.single('file'), (req, res) => {
app.post('/file/upload', (req, res) => {
  // console.log(req.query);
  // returns {args: [array, of, args]}
  console.log('request!');
  parse(req, res);
});

app.get('/filestack/key', (req, res) => {
  console.log('fs key request');
  console.log(process.env.FILESTACK, 'this thing');
  res.send({
    fsKey: process.env.FILESTACK,
  });
});

app.post('/generate/profile', (req, res) => {
  //connect to mla/dynamodb
  //generate profile
  //return uuid
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log('__________________________________________________')
  console.log(`\nProject Stoffel Application Server | Port: ${port}\n`);
});
