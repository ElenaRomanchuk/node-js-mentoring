import { Router } from 'express';
import { Container } from 'typedi';
import { groupValidation } from '../middleware/validation/groupValidation';
import { addUsersValidation } from '../middleware/validation/addUsersToGroupValidation';
import {GroupController} from "../controllers/groupsController";
import '../models';

const groupController = Container.get(GroupController);

export const groupRouter = Router();

groupRouter.route('/groups')
  .get(groupController.getGroups.bind(groupController))
  .post(groupValidation, groupController.createGroup);

groupRouter.route('/groups/:id')
  .get(groupController.getGroupById.bind(groupController))
  .put(groupValidation, groupController.updateGroup.bind(groupController))
  .delete(groupController.deleteGroup.bind(groupController));
groupRouter.route('/groups/:id/add')
  .post(addUsersValidation, groupController.addUsersToGroup.bind(groupController));

