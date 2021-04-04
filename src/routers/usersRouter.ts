import { Router } from 'express';
import { Container } from 'typedi';
import { userValidation } from '../middleware/validation/userValidation';
import { userSearchValidation } from '../middleware/validation/userSearchValidation';
import {UserController} from "../controllers/usersController";
import '../models';

const userController = Container.get(UserController);

export const userRouter = Router();

  userRouter.route('/users')
    .get(userController.getUsers)
    .post(userValidation, userController.createUser);

  userRouter.route('/users/:id')
    .get(userController.getUserById)
    .put(userValidation, userController.updateUser)
    .delete(userController.deleteUser);

  userRouter.get('/search', userSearchValidation, userController.getUserSuggestions);

