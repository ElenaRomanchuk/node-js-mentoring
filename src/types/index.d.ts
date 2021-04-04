import {Optional} from "sequelize";

export interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  isdeleted: boolean;
};

export interface UserCreationAttributes extends Optional<User, "id"> {};
