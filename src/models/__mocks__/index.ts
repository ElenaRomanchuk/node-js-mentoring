export const UserModel = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
};

export const GroupModel = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
};

export const sequelize = {
  transaction: async (callback: Function) => await callback(),
};
