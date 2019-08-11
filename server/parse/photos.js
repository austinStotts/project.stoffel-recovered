require('dotenv').config();
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const S3 = new AWS.S3({
  secretAccessKey: process.env.SECRET,
  accessKeyId: process.env.ACCESS
})

// Add photos to S3
module.exports = name => {
  fs.readdir(
    path.resolve(__dirname, "../files/json/photos_and_videos"),
    (err, folder) => {
      if (err) {
      } else {
        for (let i = 0; i < folder.length; i++) {
          fs.readdir(
            path.resolve(
              __dirname,
              `../files/json/photos_and_videos/${folder[i]}`
            ),
            (err, file) => {
              if (err) {
              } else {
                for (let j = 0; j < file.length; j++) {
                  if (file[j].endsWith(".jpg")) {
                    fs.readFile(
                      path.resolve(
                        __dirname,
                        `../files/json/photos_and_videos/${folder[i]}/${
                          file[j]
                        }`
                      ),
                      (err, data) => {
                        if (err) {
                          console.log(err);
                        } else {
                          S3.putObject(
                            {
                              Bucket: "project.stoffel",
                              Body: data,
                              Key: `${name}/photos/${folder[i]}/${file[j]}`
                            },
                            (err, responce) => {
                              if (err) {
                                console.log(err);
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              }
            }
          );
        }
      }
    }
  );
}