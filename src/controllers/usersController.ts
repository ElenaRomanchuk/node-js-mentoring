import { Request, Response, NextFunction } from 'express';
import userStorage from '../model/usersModel';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(userStorage.getUsers());
    } catch (error) {
        next(error);
    }
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  try {
      const user = userStorage.getUserById(req.params.id);
      if (user) {
          res.json(user);
      } else {
          res.status(404).json({message: `User with id "${req.params.id}" not found`});
      }
  } catch (error) {
      next(error)
  }
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        res.json(userStorage.createUser(user));
    } catch (error) {
        next(error)
    }
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = {... req.body, id: req.params.id};
        if (userStorage.getUserById(user.id)) {
            userStorage.updateUser(user);
            res.sendStatus(200);
        } else {
            res.status(404).json({ message: `User with id "${user.id}" not found`})
        }
    } catch (error) {
        next(error)
    }
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = userStorage.getUserById(req.params.id);
        if (user) {
            userStorage.deleteUser(user.id);
            res.sendStatus(200);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        next(error)
    }
};

export const getUserSuggestions = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { login, limit } = req.query;
        res.json(userStorage.getAutoSuggestUsers((login || '').toString(), Number(limit)));
    } catch (error) {
        next(error)
    }
};