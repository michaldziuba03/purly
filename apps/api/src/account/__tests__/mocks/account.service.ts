import { accountStub } from '../stubs/account.stub';
import { returnPromise } from '../../../common/utils';

export const AccountServiceMock = {
  accountExists: jest.fn().mockResolvedValue(false),
  createAccount: jest.fn().mockResolvedValue(accountStub()),
  findByEmailAndPass: jest.fn().mockResolvedValue(accountStub()),
  findAccountById: jest.fn().mockResolvedValue(accountStub()),
  updateAccountById: jest.fn((_, data) => {
    return returnPromise({
      ...accountStub(),
      ...data,
    });
  }),
};
