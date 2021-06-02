import {Request, Response, NextFunction} from 'express';
import jsonwebtoken, {VerifyErrors} from 'jsonwebtoken';
import config from '../config';

export const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/login/') {
    return next();
  }
  const token = req.headers.authorization;
  if (token) {
    jsonwebtoken.verify(token.split(' ').pop() || '', config.secret, (err: VerifyErrors | null) => {
      if (!err) {
        next();
      } else {
        next({
          status: 403,
          message: 'You don\'t have permission to access',
        })
      }
    })
  } else {
      next({
        status: 401,
        message: 'User is not authorized'
      })
    }
};
