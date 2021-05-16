import 'reflect-metadata';
import express from 'express';
import { logger } from './logging/logger';
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from './middleware/requestLogger';
import { userRouter, groupRouter } from './routers';
import { initDB } from './loaders/initDB';
import config from './config';

process.on('uncaughtException', (err: Error, origin: string) => {
  logger.error(err.message, { origin, stack: err.stack });
});

process.on('unhandledRejection', (error: Error) => {
  if (error) {
    logger.error(error.message, { stack: error.stack });
  } else {
    logger.error('unhandled promise rejection')
  }
});

const startServer = async () => {
  console.log('Start initialization DB...');
  await initDB();

  const app = express();

  app.use(express.json());
  app.use(requestLogger);
  app.use(errorHandler);

  await app.listen(config.port);
  console.log(`NodeJS mentoring application is running on ${config.port} port`)

  app.use('/', [userRouter, groupRouter]);
};

startServer();
