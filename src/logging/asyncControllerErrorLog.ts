import {NextFunction, Request, Response} from "express";
import { logger } from "./logger";

export function asyncControllerErrorLog() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const targetMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        return await targetMethod.apply(this, [req, res, next]);
      } catch (e) {
        logger.error(e.message, {
          method: propertyKey,
          url: req.url,
          body: req.body,
        });
        next(e);
      }
    };
     
return descriptor;
  }
}
