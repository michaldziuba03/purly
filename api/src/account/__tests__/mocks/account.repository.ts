import { accountStub } from '../stubs/account.stub';

export const AccountRepositoryMock = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(accountStub()),
  findOne: jest.fn().mockResolvedValue(accountStub()),
  findOneAndUpdate: jest.fn().mockResolvedValue(accountStub()),
  exists: jest.fn(),
});
