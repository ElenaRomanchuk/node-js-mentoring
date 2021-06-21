import { Service } from "typedi";
import { Model } from 'sequelize';
import { Group, GroupCreationAttributes } from '../types';
import { GroupModel } from '../models';

@Service()
export class GroupMapper {
  toDomain(dalEntity: Model<Group, GroupCreationAttributes>) {
    return dalEntity.get();
  };

  toDalEntity(domainEntity: Group) {
    return GroupModel.build(domainEntity);
  }
};

