import express from 'express';
import { errorHandler } from "./middleware/errorHandler";
import { usersRouter } from './routers';

const DEFAULT_PORT = 3000;

const app = express();

app.use(express.json());
app.use(errorHandler);

const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => console.log(`NodeJS mentoring application is running on ${port} port`));

app.use('/', usersRouter);