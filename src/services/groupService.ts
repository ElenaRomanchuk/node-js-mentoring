import httpErrors from 'http-errors';
import {Inject, Service} from 'typedi';
import {Op} from 'sequelize';
import {GroupModel, UserModel, sequelize} from '../models';
import {GroupMapper} from '../mappers/groupMapper';
import {Group, GroupCreationAttributes, User, UserGroup} from '../types';
import {GROUP_NOT_FOUND} from "../constants";

@Service()
export class GroupService {
  constructor(
    @Inject('GroupModel') private groupModel: typeof GroupModel,
    private groupMapper: GroupMapper,
    @Inject('UserModel') private userModel: typeof UserModel,
  ) {
  }

  public async getGroups(): Promise<Group[]> {
    const groups = await this.groupModel.findAll();

    return groups.map((group) => this.groupMapper.toDomain(group));
  }

  public async getGroupByID(id: string): Promise<Group> {
    const group = await this.groupModel.findOne();

    if (group) {
      return this.groupMapper.toDomain(group);
    }
    throw httpErrors(404, GROUP_NOT_FOUND);
  }

  public async deleteGroup(id: string): Promise<boolean> {
    const group = await this.groupModel.findOne({where: {id}});

    if (group) {
      await this.groupModel.destroy({where: {id}});

      return true;
    }
    throw httpErrors(404, GROUP_NOT_FOUND);
  }

  public async updateGroup(data: Group): Promise<Group> {
    const {id = '', name, permissions} = data;
    const group = await this.groupModel.findOne({where: {id}});

    if (group) {
      await group.update({
        name,
        permissions,
      });

      return this.groupMapper.toDomain(group);
    }
    throw httpErrors(404, GROUP_NOT_FOUND);
  }

  public async createGroup(data: GroupCreationAttributes): Promise<Group> {
    const {name, permissions} = data;
    const group = await this.groupModel.create({
      name,
      permissions,
    });

    return this.groupMapper.toDomain(group);
  }

  public async addUsersToGroup(groupId: Group['id'], usersIds: User['id'][]): Promise<UserGroup[]> {
    const group = await this.groupModel.findOne({where: {id: groupId}});

    if (!group) {
      throw httpErrors(404, GROUP_NOT_FOUND);
    }
    const users = await this.userModel.findAll({where: {id: {[Op.in]: usersIds}}});

    return await sequelize.transaction(async (transaction) =>
      // @ts-ignore
      await group.addUsers(users, {transaction})
    );
  }
}
