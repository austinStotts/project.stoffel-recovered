require("dotenv").config();
const extract = require("extract-zip");
const fs = require("fs");
const remove = require("rimraf");
const path = require("path");
const concat = require("json-concat");
const Axios = require("axios");
const email = require("../email.js");
const tests = require('./profile');
const photos = require('./photos');
const AWS = require("aws-sdk");
const S3 = new AWS.S3({
  secretAccessKey: process.env.SECRET,
  accessKeyId: process.env.ACCESS
});

// send fail email
const fail = (data) => {
  Axios.post('synctoolsmail.net/mail/send', data)
  .then(response => console.log(response))
  .catch(err => console.log(err));
}

// delete ./files directory
const deleteFile = () => {
  fs.exists(path.resolve(__dirname, './files'), (pass) => {
    if(pass) {
      remove(path.resolve(__dirname, './files'), (err) => {
        if (err) {
          console.log(err);
        }
      })
    }
  })
}

//  * * * PARSE * * * 
let parse = (req, res) => {
  console.log(`\n****************************************\nParsing user zip file:`);
  console.log(req.body);
  deleteFile();
  S3.getObject({
      Bucket: "project.stoffel",
      Key: req.body.key
    },(err, data) => {
      if (err) {
        console.log(err);
        res.status(418).send("error downloading .zip file from S3");
      } else {
        console.log("\ndownloading .zip from S3");
        fs.mkdir(path.resolve(__dirname, "./files"), (err, response) => {
          if (err) {
            console.log(err);
            res.status(418).send("error creating folder");
          } else {
            console.log("\n/files directory has been made");
            fs.writeFile(
              path.resolve(__dirname, "./files/json.zip"),
              data.Body,
              (err, data) => {
                if (err) {
                  console.log(err);
                  res.status(418).send("error writing zip file to drive");
                } else {
                  console.log("\nextracting .zip file");
                  extract(
                    path.resolve(__dirname, "./files/json.zip"),
                    { dir: path.resolve(__dirname, "./files/json") },
                    err => {
                      if (err) {
                        console.log(err);
                        res.status(418).send("error extracting .zip file");
                      } else {
                        console.log("json files have been made");
                        concat(
                          {
                            src: path.resolve(__dirname, "./files/json"),
                            dest: path.resolve(
                              __dirname,
                              "./files/json/bundle.json"
                            )
                          },
                          (err, object) => {
                            if (err) {
                              console.log(err);
                              res.status(418).send("error creating json files");
                            } else {
                              console.log("\nbff json object has been created");
                              if (object["profile"]) {
                                let userAge = tests.age(
                                  object["profile"]["birthday"]
                                );
                                let accountAge = tests.account(
                                  object["profile"]["registration_timestamp"]
                                );
                                let passwordChange = tests.passwordHistory(
                                  object["admin_records"]
                                );
                                let multipleUse = tests.accountActivity(
                                  object["account_activity"]
                                );

                                console.log("\n");
                                console.log(
                                  "age verification:          ",
                                  accountAge
                                );
                                console.log(
                                  "account age verification:  ",
                                  userAge
                                );
                                console.log(
                                  "mobile and desktop use:    ",
                                  passwordChange
                                );
                                console.log(
                                  "password history:          ",
                                  multipleUse
                                );
                                console.log("\n");
                                if(accountAge && userAge && passwordChange && multipleUse) {
                                  // just send pass or fail, client will render results...
                                  // tests pass, send result to client
                                  res.status(200).send(object["profile"]["profile_uri"]);
                                  photos(req.body.email);

                                  S3.putObject(
                                    {
                                      Bucket: "project.stoffel",
                                      Body: JSON.stringify(object),
                                      Key: `${req.body.email}/bundle.json`
                                    },
                                    (err, data) => {
                                      if (err) {
                                        console.log(err);
                                      } else {
                                        console.log(
                                          "\nbundle.json has been stored in S3"
                                        );
                                      }
                                    });
                                }
                              } else {
                                console.log("error the file uploaded is not valid");
                                res.status(418).send("error the file uploaded is not valid");
                              }
                              deleteFile();
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    }
  );
};

module.exports = parse;
