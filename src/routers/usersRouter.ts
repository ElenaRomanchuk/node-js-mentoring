import { Router } from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    getUserSuggestions, deleteUser
} from "../controllers/usersController";

export const usersRouter = Router();

usersRouter.route('/users')
    .get(getUsers)
    .post(createUser);

usersRouter.route('/users/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

usersRouter.get('/search', getUserSuggestions);