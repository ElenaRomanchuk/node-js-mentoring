import winston, { Logger } from 'winston';

let logger: Logger;

export class LoggerFactory {
  static getInstance(){
    if (logger) {
      return logger;
    } else {
      return logger = winston.createLogger({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
        transports: [
          new winston.transports.Console(),
        ],
      });

    }
  }
}
