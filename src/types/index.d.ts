import {Optional} from "sequelize";

export interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  isdeleted: boolean;
};

export interface UserCreationAttributes extends Optional<User, "id"> {};

export enum GroupPermission {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  SHARE = 'SHARE',
  UPLOAD_FILES = 'UPLOAD_FILES',
};

export interface Group {
  id: string;
  name: string;
  permissions: Array<GroupPermission>;
};

export interface GroupCreationAttributes extends Optional<Group, "id"> {};

export interface UserGroup {
  UserId: string;
  GroupId: string;
}
