import Joi from 'joi';
import {
  ContainerTypes,
  ValidatedRequestSchema,
  createValidator
} from 'express-joi-validation';

interface LoginValidationObject {
  login: string;
  password: string;
}

type UserSchema = Joi.ObjectSchema<LoginValidationObject>;

const loginSchema: UserSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

export interface LoginRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: LoginValidationObject;
}

export const loginValidation = createValidator().body(loginSchema);
