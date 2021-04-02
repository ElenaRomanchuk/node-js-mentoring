import { v4 as uuid } from 'uuid';
import { users } from './data';
import { User } from '../types';

const activeUsersFilter = (user: User) => !user.isDeleted;

class UserStorage {
  static instance: UserStorage;
  private users: User[] = [];

  constructor(users: User[]) {
    if (UserStorage.instance) {
      return UserStorage.instance;
    }
    this.users = users;
  }

  getUsers(): User[] {
    return this.users.filter(activeUsersFilter);
  }

  getUserById(id: User["id"]): User | undefined {
    return this.users.find((user: User) => user.id === id);
  }

  createUser(userData: Partial<User>) {
    const newUser = {...userData, id: uuid(), isDeleted: false};
    this.users.push(<User>newUser);
    return newUser;
  }

  updateUser(user: Partial<User>) {
    this.users = this.users.map((storedUser: User) =>
      storedUser.id === user.id ? { ...storedUser, ...user } : storedUser
    );
  }

  deleteUser(id: User["id"]) {
    this.users = this.users.map((user) => user.id === id ? { ...user, isDeleted: true }: user);
  }

  getAutoSuggestUsers(loginSubstring: string = '', limit: number): User[] {
    const filteredUsers = this.getUsers()
      .filter((user: User) => user.login.toLowerCase().startsWith(loginSubstring.toLowerCase()))
      .sort((user1: User, user2: User) => (user1.login > user2.login ? -1 : 1));

    if (limit) {
      return filteredUsers.slice(0, limit)
    }

    return  filteredUsers;
  }
}

export default new UserStorage(users);
