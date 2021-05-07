import Joi from 'joi';
import {
  ContainerTypes,
  ValidatedRequestSchema,
  createValidator
} from 'express-joi-validation';
import { GroupPermission } from '../../types';

interface GroupValidationObject {
  name: string;
  permissions: GroupPermission[];
}

type GroupSchema = Joi.ObjectSchema<GroupValidationObject>;

const groupSchema: GroupSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().required(),
});

export interface GroupRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: GroupValidationObject;
}

export const groupValidation = createValidator().body(groupSchema);
