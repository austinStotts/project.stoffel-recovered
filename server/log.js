const winston = require('winston');

class Logger {
  constructor(data) {
    this.context = data.context;

    const customLevels = {
      levels: {
        error: 0,
        info: 1,
        action: 2,
        success: 3,
      },
      colors: {
        error: 'red',
        info: 'cyan',

        action: 'yellow',
        success: 'bold white greenBG',
      },
    };
    //12345

    winston.createLogger({
      levels: customLevels.levels,
      transports: [
        new winston.transports.Console({
          level: 'action',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json(),
            winston.format.timestamp(),
            winston.format.printf(
              info =>
                `${info.timestamp} ${info.level} [${data.context}]: ${
                  info.message
                }`
            )
          ),
          colorize: true,
        }),
        new winston.transports.File({
          level: 'action',
          format: winston.format.combine(
            winston.format.json(),
            winston.format.timestamp(),
            winston.format.printf(
              info =>
                `${info.timestamp} ${info.level} [${data.context}]: ${
                  info.message
                }`
            )
          ),
          filename: 'logs.log',
        }),
      ],
    });

    const logger = winston.createLogger({
      levels: customLevels.levels,
      transports: [
        new winston.transports.Console({
          level: 'success',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json(),
            winston.format.timestamp(),
            winston.format.printf(
              info =>
                `${info.timestamp} ${info.level} [${data.context}]: ${
                  info.message
                }`
            )
          ),
          colorize: true,
        }),
        new winston.transports.File({
          level: 'action',
          format: winston.format.combine(
            winston.format.json(),
            winston.format.timestamp(),
            winston.format.printf(
              info =>
                `${info.timestamp} ${info.level} [${data.context}]: ${
                  info.message
                }`
            )
          ),
          filename: `${__dirname}/../logs.log`,
        }),
      ],
    });

    winston.addColors(customLevels.colors);

    return logger;
  }
}

module.exports = Logger;
