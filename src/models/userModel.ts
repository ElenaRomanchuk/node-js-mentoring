import { Sequelize, ModelDefined, DataTypes } from 'sequelize';
import { UserCreationAttributes, User } from '../types';

export default (sequelize: Sequelize) => {
  const UserModel: ModelDefined<User, UserCreationAttributes> = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      isdeleted: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: false,
      }
    },
    {
      tableName: 'users',
      paranoid: true
    }
  );
  return UserModel;
};
