import {Request, Response, NextFunction} from 'express';
import {ValidatedRequest} from 'express-joi-validation';
import {Service} from "typedi";
import {GroupRequestSchema} from '../middleware/validation/groupValidation';
import { AddUsersRequestSchema } from '../middleware/validation/addUsersToGroupValidation';
import { GroupService } from '../services/groupService';

@Service()
export class GroupController {
  private groupService;

  constructor(groupService: GroupService) {
    this.groupService = groupService;
  }

  getGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groups = await this.groupService.getGroups();
      res.json(groups);
    } catch (error) {
      next(error);
    }
  }

  getGroupById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const group = await this.groupService.getGroupByID(req.params.id);
      if (group) {
        res.json(group);
      } else {
        res.status(404).json({message: `Group with id "${req.params.id}" not found`});
      }
    } catch (error) {
      next(error)
    }
  }

  createGroup = async (req: ValidatedRequest<GroupRequestSchema>, res: Response, next: NextFunction) => {
    try {
      const groupData = req.body;
      const group = await this.groupService.createGroup(groupData);
      res.json(group);
    } catch (error) {
      next(error)
    }
  }

  updateGroup = async (req: ValidatedRequest<GroupRequestSchema>, res: Response, next: NextFunction) => {
    try {
      const groupData = {...req.body, id: req.params.id};
      const group = await this.groupService.updateGroup(groupData);
      res.send(group);
    } catch (error) {
      next(error)
    }
  }

  deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.groupService.deleteGroup(req.params.id);
      res.sendStatus(200);
    } catch (error) {
      next(error)
    }
  }

  addUsersToGroup = async (req: ValidatedRequest<AddUsersRequestSchema>, res: Response, next: NextFunction) => {
    try {
      const group = await this.groupService.addUsersToGroup(req.params.id, req.query.user);
      res.send(group);
    } catch (error) {
      next(error)
    }
  }
}

