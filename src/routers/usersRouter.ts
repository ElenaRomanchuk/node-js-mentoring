import {Router} from 'express';
import { Container } from 'typedi';
import { userValidation } from '../middleware/validation/userValidation';
import { userSearchValidation } from '../middleware/validation/userSearchValidation';
import {UserController} from "../controllers/usersController";
import '../models';

const userController = Container.get(UserController);

export const userRouter = Router();

  userRouter.route('/users')
    .get(userController.getUsers.bind(userController))
    .post(userValidation, userController.createUser.bind(userController));

  userRouter.route('/users/:id')
    .get(userController.getUserById.bind(userController))
    .put(userValidation,userController.updateUser.bind(userController))
    .delete(userController.deleteUser.bind(userController));

userRouter.get('/search', userSearchValidation, userController.getUserSuggestions.bind(userController));

