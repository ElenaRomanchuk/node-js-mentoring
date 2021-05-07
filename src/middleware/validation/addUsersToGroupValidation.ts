import Joi from 'joi';
import {
  ContainerTypes,
  ValidatedRequestSchema,
  createValidator
} from 'express-joi-validation';

interface UserIdsObject {
  user: string[];
}

type addUsersObjectsSchema = Joi.ObjectSchema<UserIdsObject>;

const userSearchSchema: addUsersObjectsSchema = Joi.object({
  user: Joi.array().items(Joi.string()),
});

export interface AddUsersRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: UserIdsObject;
}

export const addUsersValidation = createValidator().query(userSearchSchema);
