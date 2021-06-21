import {DataTypes, ModelDefined, Sequelize} from 'sequelize';
import {Group, GroupCreationAttributes, GroupPermission} from "../types";

const permissions: (keyof typeof GroupPermission)[] = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

export default (sequelize: Sequelize) => {
  const GroupModel: ModelDefined<Group, GroupCreationAttributes> = sequelize.define(
    'Group',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      permissions: {
        type: DataTypes.ARRAY(DataTypes.ENUM),
        values: permissions,
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      tableName: 'groups',
      paranoid: true
    }
  );

  return GroupModel;
};
