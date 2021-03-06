import {Request, Response, NextFunction} from 'express';
import {ValidatedRequest} from 'express-joi-validation';
import {Service} from "typedi";
import {GroupRequestSchema} from '../middleware/validation/groupValidation';
import { AddUsersRequestSchema } from '../middleware/validation/addUsersToGroupValidation';
import { GroupService } from '../services/groupService';
import { asyncControllerErrorLog } from '../logging/asyncControllerErrorLog';

@Service()
export class GroupController {
  private groupService;

  constructor(groupService: GroupService) {
    this.groupService = groupService;
  }

  @asyncControllerErrorLog()
  async getGroups (req: Request, res: Response, next: NextFunction) {
    try {
      const groups = await this.groupService.getGroups();
      res.json(groups);
    } catch (error) {
      next(error);
    }
  }

  @asyncControllerErrorLog()
  async getGroupById (req: Request, res: Response, next: NextFunction) {
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

  @asyncControllerErrorLog()
  async createGroup (req: ValidatedRequest<GroupRequestSchema>, res: Response, next: NextFunction) {
    try {
      const groupData = req.body;
      const group = await this.groupService.createGroup(groupData);
      res.json(group);
    } catch (error) {
      next(error)
    }
  }

  @asyncControllerErrorLog()
  async updateGroup (req: ValidatedRequest<GroupRequestSchema>, res: Response, next: NextFunction) {
    try {
      const groupData = {...req.body, id: req.params.id};
      const group = await this.groupService.updateGroup(groupData);
      res.send(group);
    } catch (error) {
      next(error)
    }
  }

  @asyncControllerErrorLog()
  async deleteGroup (req: Request, res: Response, next: NextFunction) {
    try {
      await this.groupService.deleteGroup(req.params.id);
      res.sendStatus(200);
    } catch (error) {
      next(error)
    }
  }

  @asyncControllerErrorLog()
  async addUsersToGroup (req: ValidatedRequest<AddUsersRequestSchema>, res: Response, next: NextFunction) {
    try {
      const group = await this.groupService.addUsersToGroup(req.params.id, req.query.user);
      res.send(group);
    } catch (error) {
      next(error)
    }
  }
}

