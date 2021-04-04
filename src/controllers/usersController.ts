import {Request, Response, NextFunction} from 'express';
import {ValidatedRequest} from 'express-joi-validation';
import {Service} from "typedi";
import {UserRequestSchema} from '../middleware/validation/userValidation';
import {UserSearchRequestSchema} from '../middleware/validation/userSearchValidation'
import { UserService } from '../services/userService';

@Service()
export class UserController {
  private userService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserByID(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({message: `User with id "${req.params.id}" not found`});
      }
    } catch (error) {
      next(error)
    }
  }

  createUser = async (req: ValidatedRequest<UserRequestSchema>, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const user = await this.userService.createUser(userData);
      res.json(user);
    } catch (error) {
      next(error)
    }
  }

  updateUser = async (req: ValidatedRequest<UserRequestSchema>, res: Response, next: NextFunction) => {
    try {
      const userData = {...req.body, id: req.params.id};
      const user = await this.userService.updateUser(userData);
      res.send(user);
    } catch (error) {
      next(error)
    }
  }

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.userService.deleteUser(req.params.id);
      res.sendStatus(200);
    } catch (error) {
      next(error)
    }
  }

  getUserSuggestions = async (req: ValidatedRequest<UserSearchRequestSchema>, res: Response, next: NextFunction) => {
    try {
      const {login, limit} = req.query;
      const users = await this.userService.getAutoSuggestUsers((login || '').toString(), Number(limit));
      res.json(users);
    } catch (error) {
      next(error)
    }
  }
}

