import {Sequelize} from "sequelize";
import { Container } from "typedi";
import config from "../config";
import createUserModel from "./userModel";
import createGroupModel from "./groupModel";

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    define: {
      timestamps: false,
    },
    dialect: 'postgres',
    host: config.host,
    port: +config.dbPort,
  },
);
export const UserModel = createUserModel(sequelize);
export const GroupModel = createGroupModel(sequelize);

UserModel.belongsToMany(GroupModel, { through: 'user_group' });
GroupModel.belongsToMany(UserModel, { through: 'user_group' });

Container.set('UserModel', UserModel);
Container.set('GroupModel', GroupModel);

