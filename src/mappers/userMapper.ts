import { Service } from "typedi";
import { Model } from 'sequelize';
import { User, UserCreationAttributes } from '../types';
import { UserModel } from '../models';

@Service()
export class UserMapper {
  toDomain(dalEntity: Model<User, UserCreationAttributes>) {
    return dalEntity.get();
  };
   toDalEntity(domainEntity: User) {
    return UserModel.build(domainEntity);
   }
};

