import Joi from 'joi';
import {
  ContainerTypes,
  ValidatedRequestSchema,
  createValidator
} from 'express-joi-validation';

interface UserValidationObject {
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

type UserSchema = Joi.ObjectSchema<UserValidationObject>;

const userSchema: UserSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().regex(/(?=.*[0-9])(?=.*[a-zA-Z])/).required(),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.boolean(),
});

export interface UserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UserValidationObject;
}

export const userValidation = createValidator().body(userSchema);
