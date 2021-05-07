import { Router } from 'express';
import { Container } from 'typedi';
import { groupValidation } from '../middleware/validation/groupValidation';
import { addUsersValidation } from '../middleware/validation/addUsersToGroupValidation';
import {GroupController} from "../controllers/groupsController";
import '../models';

const groupController = Container.get(GroupController);

export const groupRouter = Router();

groupRouter.route('/groups')
  .get(groupController.getGroups)
  .post(groupValidation, groupController.createGroup);

groupRouter.route('/groups/:id')
  .get(groupController.getGroupById)
  .put(groupValidation, groupController.updateGroup)
  .delete(groupController.deleteGroup);
groupRouter.route('/groups/:id/add')
  .post(addUsersValidation, groupController.addUsersToGroup);

