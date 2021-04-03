import Joi from 'joi';
import {
  ContainerTypes,
  ValidatedRequestSchema,
  createValidator
} from 'express-joi-validation';

interface UserSearchObject {
  login: string;
  limit: string;
}

type UserSearchSchema = Joi.ObjectSchema<UserSearchObject>;

const userSearchSchema: UserSearchSchema = Joi.object({
  login: Joi.string(),
  limit: Joi.number().min(1).required(),
});

export interface UserSearchRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: UserSearchObject;
}

export const userSearchValidation = createValidator().query(userSearchSchema);
