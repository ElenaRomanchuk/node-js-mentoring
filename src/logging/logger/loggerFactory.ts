import winston, { Logger } from 'winston';
import config from '../../config';

let logger: Logger;

export class WinstonLogger {
  static getInstance(){
    if (logger) {
      return logger;
    } 
      
return logger = winston.createLogger({
        silent: config.silentMode,
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
