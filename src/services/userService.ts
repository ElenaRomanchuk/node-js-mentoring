import  httpErrors  from 'http-errors';
import { Op , WhereOptions } from 'sequelize';
import { Inject, Service} from 'typedi';
import { UserModel } from '../models';
import { UserMapper } from '../mappers/userMapper';
import { User, UserCreationAttributes } from '../types';

const USER_NOT_FOUND = 'User not found';

@Service()
export class UserService {
  constructor(@Inject('UserModel') private userModel: typeof UserModel, private userMapper: UserMapper){
  }

  public async getUsers(): Promise<User[]> {
    const users = await this.userModel.findAll({ where: { isdeleted: false } });
    return users.map((user) => this.userMapper.toDomain(user));
  }

  public async getUserByID(id: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { id, isdeleted: false } });
    if (user) {
      return this.userMapper.toDomain(user);
    }
    throw httpErrors(404, USER_NOT_FOUND);
  }

  public async getUserByCredentials (login: User['login'], password: User['password']) {
    return this.userModel.findOne({ where: { login, password }});
  }

  public async deleteUser(id: string): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { id, isdeleted: false } });
    if (user) {
      user.set('isdeleted', true);
      await user.save();
      return true;
    }
    throw httpErrors(404, USER_NOT_FOUND);
  }

  public async updateUser(data: User): Promise<User> {
    const { id = '', login, age, password, isdeleted } = data ;
    const user = await this.userModel.findOne({ where : { id, isdeleted: false } });
    if (user) {
      user.set('login', login);
      user.set('age', age);
      user.set('password', password);
      user.set('isdeleted', isdeleted);
      await user.save();
      return this.userMapper.toDomain(user);
    }
    throw httpErrors(404, USER_NOT_FOUND);
  }

  public async createUser(data: UserCreationAttributes): Promise<User> {
    const { login, password, age } = data;
    const user = await this.userModel.create({
      age,
      login,
      password,
      isdeleted: false,
    });
    return this.userMapper.toDomain(user);
  }

  public async getAutoSuggestUsers(
    loginSubstring: string,
    limit?: number,
  ): Promise<User[]> {
    const where: WhereOptions = loginSubstring
      ? { login: { [Op.iLike]: `${loginSubstring}%` }, isdeleted: false }
      : {};
    const users = await this.userModel.findAll({ limit, where });
    return users.map((user) => this.userMapper.toDomain(user));
  }
}
