import {Router} from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  getUserSuggestions, deleteUser
} from "../controllers/usersController";
import {userValidation} from '../middleware/validation/userValidation';
import {userSearchValidation} from '../middleware/validation/userSearchValidation'

export const usersRouter = Router();

usersRouter.route('/users')
  .get(getUsers)
  .post(userValidation, createUser);

usersRouter.route('/users/:id')
  .get(getUserById)
  .put(userValidation, updateUser)
  .delete(deleteUser);

usersRouter.get('/search', userSearchValidation, getUserSuggestions);
