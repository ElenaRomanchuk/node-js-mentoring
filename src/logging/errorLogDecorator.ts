import { logger } from "./logger";

export function errorLog() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const targetMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      try {
        return targetMethod.apply(this, args);
      } catch (e) {
        logger.log('ERROR', {method: propertyKey, args, message: e.message });
      }
    }
  }
}
