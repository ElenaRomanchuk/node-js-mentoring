import {Request, Response, NextFunction} from 'express';
import { logger } from '../logging/logger';

interface MiddlewareError {
  status:  number;
  message?: string;
}

export const errorHandler = (err: MiddlewareError, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = 'Server Error' } = err;

  res.status(status).json(message);
  logger.error(message);
};
