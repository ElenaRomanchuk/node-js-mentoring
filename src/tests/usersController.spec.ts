import { NextFunction, Request, Response } from "express";
import httpErrors from "http-errors";
import { Op } from "sequelize";
import { MapperMock } from './mocks/mapperMock';
import { UserModel } from '../models';
import { UserService } from '../services/userService';
import { responseMock } from './mocks/responseMock';
import { UserController } from "../controllers/usersController";
import { USER_NOT_FOUND } from '../constants';

const fakeUsers = [
  {
    id: '7d14c869-5a0f-4503-bffb-93718e1f6d93',
    login: 'admin',
    password: 'admin007',
    age: 30,
    isDeleted: false
  },
  {
    id: '3af44b26-861b-44e1-8fd7-4f8c8480c1d7',
    login: 'adam',
    password: 'blabla1',
    age: 33,
    isDeleted: false,
  },
  {
    id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
    login: 'eva',
    password: 'Zeva12',
    age: 32,
    isDeleted: false,
  },
];

const fakeUser = {
  update: jest.fn(),
  delete: jest.fn(),
};

jest.mock('../models');

describe('userController', ()=> {
  let userController: UserController;
  let userService: UserService;
  let nextFnMock: NextFunction;

  beforeAll(() => {
    nextFnMock = jest.fn();
  });

  afterAll(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getUsers: should return the list of users', async () => {
    UserModel.findAll = jest.fn().mockImplementation(() => Promise.resolve(fakeUsers));
    // @ts-ignore
    userService = new UserService(UserModel, new MapperMock());
    userController = new UserController(userService);
    const req = {};

    // @ts-ignore
    await userController.getUsers(req as Request, responseMock as Response, nextFnMock);

    expect(responseMock.json).toBeCalledWith(fakeUsers)
  });

  it('getUserById: should return the user if it exists', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => Promise.resolve(fakeUser));
    // @ts-ignore
    userService = new UserService(UserModel, new MapperMock());
    userController = new UserController(userService);
    const req = {
      params: {
        id: 'id1'
      }
    };

    // @ts-ignore
    await userController.getUserById(req as Request, responseMock as Response, nextFnMock);

    expect(responseMock.json).toBeCalledWith(fakeUser)
  });

  it('getUserById: should throw 404 error if user doesn\'t exist', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => Promise.resolve());
    // @ts-ignore
    userService = new UserService(UserModel, new MapperMock());
    userController = new UserController(userService);
    const req = {
      params: {
        id: 'id1'
      }
    };

    // @ts-ignore
    await userController.getUserById(req as Request, responseMock as Response, nextFnMock);
    expect(nextFnMock).toBeCalledWith(httpErrors(404, USER_NOT_FOUND));
  });

  it('createUser: should call create method of userModel', async () => {
    UserModel.create = jest.fn().mockImplementation(() => Promise.resolve());
    // @ts-ignore
    userService = new UserService(UserModel, new MapperMock());
    userController = new UserController(userService);
    const req = {
      body: {
        login: 'user',
        password: 'user_pwd',
        age: '20',
      }
    };

    const user = {
      login: 'user',
      password: 'user_pwd',
      age: '20',
      isdeleted: false,
    };

    // @ts-ignore
    await userController.createUser(req as Request, responseMock as Response, nextFnMock);
    expect(UserModel.create).toBeCalledWith(user);
  });

  it('updateUser: should call update method of user if it exists', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => Promise.resolve(fakeUser));
    // @ts-ignore
    userService = new UserService(UserModel, new MapperMock());
    userController = new UserController(userService);
    const req = {
      params: {
        id: 'userId',
      },
      body: {
        login: 'new user login',
        password: 'new_user_pwd',
        age: '21',
      }
    };

    const userUpdateData = {
      login: 'new user login',
      password: 'new_user_pwd',
      age: '21',
    };

    // @ts-ignore
    await userController.updateUser(req as Request, responseMock as Response, nextFnMock);
    expect(fakeUser.update).toBeCalledWith(userUpdateData);
  });

  it('updateUser: should throw 404 error if user doesn\'t exist', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => Promise.resolve());
    // @ts-ignore
    userService = new UserService(UserModel, new MapperMock());
    userController = new UserController(userService);
    const req = {
      params: {
        id: 'userId',
      },
      body: {
        login: 'new user login',
        password: 'new_user_pwd',
        age: '21',
      }
    };

    // @ts-ignore
    await userController.updateUser(req as Request, responseMock as Response, nextFnMock);
    expect(nextFnMock).toBeCalledWith(httpErrors(404, USER_NOT_FOUND));
  });

  it('deleteUser: should call update method of user with isdeleted flag if user exists', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => Promise.resolve(fakeUser));
    // @ts-ignore
    userService = new UserService(UserModel, new MapperMock());
    userController = new UserController(userService);
    const req = {
      params: {
        id: 'userId',
      },
    };

    // @ts-ignore
    await userController.deleteUser(req as Request, responseMock as Response, nextFnMock);
    expect(fakeUser.update).toBeCalledWith({ isdeleted: true });
  });

  it('deleteUser: should throw 404 error if user doesn\'t exists', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => Promise.resolve());
    // @ts-ignore
    userService = new UserService(UserModel, new MapperMock());
    userController = new UserController(userService);
    const req = {
      params: {
        id: 'userId',
      },
    };

    // @ts-ignore
    await userController.deleteUser(req as Request, responseMock as Response, nextFnMock);
    expect(nextFnMock).toBeCalledWith(httpErrors(404, USER_NOT_FOUND));
  });

  it('getUserSuggestions: should call findAll method user model with login, limit and isdeleted options', async () => {
    UserModel.findAll = jest.fn().mockImplementation(() => Promise.resolve([]));
    // @ts-ignore
    userService = new UserService(UserModel, new MapperMock());
    userController = new UserController(userService);
    const req = {
      query: {
        login: 'user',
        limit: 10,
      },
    };

    // @ts-ignore
    await userController.getUserSuggestions(req as Request, responseMock as Response, nextFnMock);
    expect(UserModel.findAll).toBeCalledWith({
      limit: 10,
      where: {
        login: { [Op.iLike]: 'user%' },
        isdeleted: false }
    });
  });
});
