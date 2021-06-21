import { NextFunction, Request, Response } from "express";
import httpErrors from "http-errors";
import { MapperMock } from './mocks/mapperMock';
import { UserModel, GroupModel } from '../models';
import { GroupService } from '../services/groupService';
import { responseMock } from './mocks/responseMock';
import { GroupController } from "../controllers/groupsController";
import { GROUP_NOT_FOUND } from '../constants';
import { GroupPermission, User } from '../types';

const fakeGroups = [
  {
    id: '7d14c869-5a0f-4503-bffb-93718e123456',
    name: 'admins',
    permissions: [ GroupPermission.READ, GroupPermission.WRITE, GroupPermission.DELETE, GroupPermission.SHARE, GroupPermission.UPLOAD_FILES ],
  },
  {
    id: 'aaaaa869-5a0f-4503-bffb-93718e123456',
    name: 'managers',
    permissions: [ GroupPermission.READ, GroupPermission.WRITE, GroupPermission.SHARE, GroupPermission.UPLOAD_FILES ],
  },
  {
    id: 'aaaaa869-5a0f-4503-bffb-93718e123456',
    name: 'guests',
    permissions: [ GroupPermission.READ, GroupPermission.SHARE ],
  },
];

jest.mock('../models');

describe('groupController', ()=> {
  let groupController: GroupController;
  let groupService: GroupService;
  let nextFnMock: NextFunction;
  const fakeGroup: any = {
    update: jest.fn(),
    delete: jest.fn(),
    addUsers: jest.fn().mockImplementation(() => Promise.resolve({})),
  };
  const fakeUsers: User[] = [
    {
      id: '7d14c869-5a0f-4503-bffb-93718e1f6d93',
      login: 'admin',
      password: 'admin007',
      age: 30,
      isdeleted: false
    },
    {
      id: '3af44b26-861b-44e1-8fd7-4f8c8480c1d7',
      login: 'adam',
      password: 'blabla1',
      age: 33,
      isdeleted: false,
    },
  ];

  UserModel.findAll = jest.fn().mockImplementation(() => Promise.resolve(fakeUsers))

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

  it('getGroups: should return the list of groups', async () => {
    GroupModel.findAll = jest.fn().mockImplementation(() => Promise.resolve(fakeGroups));
    // @ts-ignore
    groupService = new GroupService(GroupModel, new MapperMock(), UserModel);
    groupController = new GroupController(groupService);
    const req = {};

    // @ts-ignore
    await groupController.getGroups(req as Request, responseMock as Response, nextFnMock);

    expect(responseMock.json).toBeCalledWith(fakeGroups)
  });

  it('getGroupById: should return the group if it exists', async () => {
    GroupModel.findOne = jest.fn().mockImplementation(() => Promise.resolve(fakeGroup));
    // @ts-ignore
    groupService = new GroupService(GroupModel, new MapperMock(), UserModel);
    groupController = new GroupController(groupService);
    const req = {
      params: {
        id: 'id1'
      }
    };

    // @ts-ignore
    await groupController.getGroupById(req as Request, responseMock as Response, nextFnMock);

    expect(responseMock.json).toBeCalledWith(fakeGroup)
  });

  it('getGroupById: should throw 404 error if group doesn\'t exist', async () => {
    GroupModel.findOne = jest.fn().mockImplementation(() => Promise.resolve());
    // @ts-ignore
    groupService = new GroupService(GroupModel, new MapperMock(), UserModel);
    groupController = new GroupController(groupService);
    const req = {
      params: {
        id: 'id1'
      }
    };

    // @ts-ignore
    await groupController.getGroupById(req as Request, responseMock as Response, nextFnMock);
    expect(nextFnMock).toBeCalledWith(httpErrors(404, GROUP_NOT_FOUND));
  });

  it('createGroup: should call create method of groupModel', async () => {
    GroupModel.create = jest.fn().mockImplementation(() => Promise.resolve());
    // @ts-ignore
    groupService = new GroupService(GroupModel, new MapperMock(), UserModel);
    groupController = new GroupController(groupService);
    const req = {
      body: {
        name: 'uploaders',
        permissions: [ GroupPermission.READ, GroupPermission.UPLOAD_FILES ],
      },
    };

    const group = {
      name: 'uploaders',
      permissions: [ GroupPermission.READ, GroupPermission.UPLOAD_FILES ],
    };

    // @ts-ignore
    await groupController.createGroup(req as Request, responseMock as Response, nextFnMock);
    expect(GroupModel.create).toBeCalledWith(group);
  });

  it('updateGroup: should call update method of group if it exists', async () => {
    GroupModel.findOne = jest.fn().mockImplementation(() => Promise.resolve(fakeGroup));
    // @ts-ignore
    groupService = new GroupService(GroupModel, new MapperMock(), UserModel);
    groupController = new GroupController(groupService);
    const req = {
      params: {
        id: 'groupId',
      },
      body: {
        name: 'shared uploaders',
        permissions: [ GroupPermission.READ, GroupPermission.UPLOAD_FILES, GroupPermission.SHARE ],
      }
    };

    const groupUpdateData = {
      name: 'shared uploaders',
      permissions: [ GroupPermission.READ, GroupPermission.UPLOAD_FILES, GroupPermission.SHARE ],
    };

    // @ts-ignore
    await groupController.updateGroup(req as Request, responseMock as Response, nextFnMock);
    expect(fakeGroup.update).toBeCalledWith(groupUpdateData);
  });

  it('updateGroup: should throw 404 error if group doesn\'t exist', async () => {
    GroupModel.findOne = jest.fn().mockImplementation(() => Promise.resolve());
    // @ts-ignore
    groupService = new GroupService(GroupModel, new MapperMock(), UserModel);
    groupController = new GroupController(groupService);
    const req = {
      params: {
        id: 'groupId',
      },
      body: {
        name: 'shared uploaders',
        permissions: [ GroupPermission.READ, GroupPermission.UPLOAD_FILES, GroupPermission.SHARE ],
      }
    };

    // @ts-ignore
    await groupController.updateGroup(req as Request, responseMock as Response, nextFnMock);
    expect(nextFnMock).toBeCalledWith(httpErrors(404, GROUP_NOT_FOUND));
  });

  it('deleteGroup: should call destroy method of groupModel with provided id if group exists', async () => {
    GroupModel.findOne = jest.fn().mockImplementation(() => Promise.resolve(fakeGroup));
    GroupModel.destroy = jest.fn().mockImplementation(() => Promise.resolve());
    // @ts-ignore
    groupService = new GroupService(GroupModel, new MapperMock(), UserModel);
    groupController = new GroupController(groupService);
    const req = {
      params: {
        id: 'groupId',
      },
    };

    // @ts-ignore
    await groupController.deleteGroup(req as Request, responseMock as Response, nextFnMock);
    expect(GroupModel.destroy).toBeCalledWith({ where: { id: 'groupId' } });
  });

  it('deleteGroup: should throw 404 error if group doesn\'t exists', async () => {
    GroupModel.findOne = jest.fn().mockImplementation(() => Promise.resolve());
    GroupModel.destroy = jest.fn();
    // @ts-ignore
    groupService = new GroupService(GroupModel, new MapperMock(), UserModel);
    groupController = new GroupController(groupService);
    const req = {
      params: {
        id: 'groupId',
      },
    };

    // @ts-ignore
    await groupController.deleteGroup(req as Request, responseMock as Response, nextFnMock);
    expect(GroupModel.destroy).not.toBeCalled();
    expect(nextFnMock).toBeCalledWith(httpErrors(404, GROUP_NOT_FOUND));
  });

  it('addUsersToGroup: should add users to group if group exists', async () => {
    GroupModel.findOne = jest.fn().mockImplementation(() => Promise.resolve(fakeGroup));
    // @ts-ignore
    groupService = new GroupService(GroupModel, new MapperMock(), UserModel);
    groupController = new GroupController(groupService);
    const req = {
      params: {
        id: 'groupId',
      },
      query: {
        user: [ 'user1', 'user2' ],
      },
    };

    jest.spyOn(groupService, 'addUsersToGroup');

    // @ts-ignore
    await groupController.addUsersToGroup(req as Request, responseMock as Response, nextFnMock);
    expect(groupService.addUsersToGroup).toBeCalledWith('groupId', [ 'user1', 'user2' ]);
    expect(fakeGroup.addUsers).toBeCalled();
    expect(responseMock.send).toBeCalled();
  });
});
