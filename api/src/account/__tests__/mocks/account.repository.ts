import { accountStub } from '../stubs/account.stub';
import { returnPromise } from '../../../common/utils';

export const AccountRepositoryMock = {
  create: jest.fn().mockResolvedValue(accountStub()),
  exists: jest.fn().mockResolvedValue(false),
  findOneById: jest.fn().mockResolvedValue(accountStub()),
  findOne: jest.fn().mockResolvedValue(accountStub()),
  findOneAndUpdate: jest.fn((_, data) => {
    return returnPromise({
      ...accountStub(),
      ...data,
    });
  }),
  find: jest.fn().mockResolvedValue([accountStub()]),
  deleteMany: jest.fn().mockResolvedValue(true),
  deleteOne: jest.fn().mockResolvedValue(true),
};
