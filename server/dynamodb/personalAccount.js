const uuidv1 = require('uuid/v4');

const Joi = require('joi');
const Dynamo = require('./dynamodb.js');
const Logger = require('../log');

const logger = new Logger({
  context: 'DYNAMO DB',
});

class PersonalAccount {
  constructor(data, cb) {
    this.dynamo = new Dynamo({
      accessKeyId: data.accessKeyId,
      secretAccessKey: data.secretAccessKey,
      region: data.region,
    });

    this.pr = this.dynamo.define('PersonalAccount', {
      hashKey: 'personalAccountID',
      // add the timestamp attributes (updatedAt, createdAt)
      timestamps: true,
      schema: {
        personalAccountID: this.dynamo.types.uuid(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        phone: Joi.string(),
        source: Joi.string(),
        fbEmail: Joi.string(),
        fbPass: Joi.string(),
        fbProfileURL: Joi.string(),
        multiloginID: Joi.string(),
        multiloginDetails: Joi.object(),
        cookies: Joi.object(),
        status: Joi.string(),
        platform: Joi.string(),
        invitedAt: Joi.string(),
        payment: Joi.number(),
      },
      indexes: [
        {
          hashKey: 'fbEmail',
          name: 'fbEmail-index',
          type: 'global',
        },
        {
          hashKey: 'personalAccountID',
          name: 'personalAccountID-index',
          type: 'global',
        },
      ],
    });

    this.dynamo.createTables(function(err) {
      if (err) {
        console.log('error creating tables: ', err);
        logger.error('Error creating tables: ', JSON.stringify(err, null, 2));
      } else {
        cb(this);
        logger.info('Tables have been created');
      }
    });
    return this;
  }

  create(data) {
    // const personalAccountID = uuidv1();
    return new Promise((resolve, reject) => {
      this.pr.create(
        {
          personalAccountID: data.personalAccountID,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          source: data.source,
          fbEmail: data.fbEmail,
          fbPass: data.fbPass,
          fbProfileURL: data.fbProfileURL,
          multiloginID: data.multiloginID,
          multiloginDetails: data.multiloginDetails,
          cookies: data.cookies,
          status: data.status,
          platform: data.platform,
          invitedAt: data.invitedAt,
          payment: data.payment
        },
        (err, res) => {
          if (err) {
            logger.error(err);
            reject(err);
          }
          logger.info(
            `PersonalAccount data was written in dynamoDB: ${JSON.stringify(
              res,
              4,
              ''
            )}`
          );
          console.log('Creating personalAccount in DynamoDb => ', res);
          resolve(res);
        }
      );
    });
  }

  // possibly change the ability to update anything but the browserIPs and the status
  update(data) {
    console.log('data in the update of the personalAccount class => ', data);
    return new Promise((resolve, reject) => {
      this.pr.update(data, (err, res) => {
        if (err) {
          logger.error(err);
          reject(err);
        }
        logger.info('Proxies field was updated:', res);
        resolve(res);
      });
    });
  }

  get(personalAccountID) {
    console.log(personalAccountID, 'HITTING PRACCOUT GET');
    return new Promise((resolve, reject) => {
      this.pr.get(
        personalAccountID,
        {
          ConsistentRead: true,
          AttributesToGet: [
            'personalAccountID',
            'firstName',
            'lastName',
            'phone',
            'source',
            'fbEmail',
            'fbPass',
            'fbProfileURL',
            'multiloginID',
            'multiloginDetails',
            'cookies',
            'status',
            'platform',
            'createdAt',
            'updatedAt',
            'invitedAt',
            'payment',
          ],
        },
        (err, res) => {
          if (err) {
            reject(err);
          } else if (res !== null) {
            resolve(res.toJSON());
          }
        }
      );
    });
  }

  query(idxName, idx) {
    return new Promise((resolve, reject) => {
      this.pr
        .query(idx)
        .usingIndex(`${idxName}-index`)
        .exec((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.Items);
          }
        });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.pr
        .scan()
        .loadAll()
        .exec((err, res) => {
          if (err) reject(err);
          resolve(res);
        });
    });
  }

  delete (paid) {
    console.log('deleting the user')
    return new Promise((resolve, reject) => {
      this.pr.delete({
        Key: paid
      }, (err, data) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(data);
        }
      })
    })
  }
}

module.exports = PersonalAccount;
