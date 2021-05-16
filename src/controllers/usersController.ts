import {Request, Response, NextFunction} from 'express';
import {ValidatedRequest} from 'express-joi-validation';
import {Service} from "typedi";
import {UserRequestSchema} from '../middleware/validation/userValidation';
import {UserSearchRequestSchema} from '../middleware/validation/userSearchValidation'
import { UserService } from '../services/userService';
import {asyncControllerErrorLog} from "../logging/asyncControllerErrorLog";

@Service()
export class UserController {
  private userService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @asyncControllerErrorLog()
  getUsers (req: Request, res: Response, next: NextFunction) {
    this.userService.getUsers().then(users => {
      res.json(users);
    });
  }

  @asyncControllerErrorLog()
  async getUserById (req: Request, res: Response, next: NextFunction) {
    const user = await this.userService.getUserByID(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({message: `User with id "${req.params.id}" not found`});
    }
  }

  @asyncControllerErrorLog()
  async createUser (req: ValidatedRequest<UserRequestSchema>, res: Response, next: NextFunction) {
    const userData = req.body;
    const user = await this.userService.createUser(userData);
    res.json(user);
  }

  @asyncControllerErrorLog()
  async updateUser (req: ValidatedRequest<UserRequestSchema>, res: Response, next: NextFunction) {
      const userData = {...req.body, id: req.params.id};
      const user = await this.userService.updateUser(userData);
      res.send(user);
  }

  @asyncControllerErrorLog()
  async deleteUser (req: Request, res: Response, next: NextFunction) {
    await this.userService.deleteUser(req.params.id);
    res.sendStatus(200);
  }

  @asyncControllerErrorLog()
  async getUserSuggestions (req: ValidatedRequest<UserSearchRequestSchema>, res: Response, next: NextFunction) {
    const {login, limit} = req.query;
    const users = await this.userService.getAutoSuggestUsers((login || '').toString(), Number(limit));
    res.json(users);
  }
}

