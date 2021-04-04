import 'reflect-metadata';
import express from 'express';
import { errorHandler } from "./middleware/errorHandler";
import { userRouter } from './routers';
import { initDB } from './loaders/initDB';
import config from './config';

const startServer = async () => {
  console.log('Start initialization DB...');
  await initDB();

  const app = express();

  app.use(express.json());
  app.use(errorHandler);

  await app.listen(config.port);
  console.log(`NodeJS mentoring application is running on ${config.port} port`)

  app.use('/', userRouter);
};

startServer();
