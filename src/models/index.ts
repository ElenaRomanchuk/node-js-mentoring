import {Sequelize} from "sequelize";
import { Container } from "typedi";
import config from "../config";
import createUserModel from "./userModel";

const sequelize = new Sequelize(
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

Container.set('UserModel', UserModel);

