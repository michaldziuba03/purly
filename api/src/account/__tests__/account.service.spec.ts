import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '../account.service';
import { AccountRepository } from '../account.repository';
import { AccountRepositoryMock } from './mocks/account.repository';
import { accountStub } from './stubs/account.stub';
import * as argon from 'argon2';

describe('AccountService', () => {
  let service: AccountService;
  let repository: AccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        { provide: AccountRepository, useClass: AccountRepositoryMock },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    repository = module.get<AccountRepository>(AccountRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  const password = '12345678';

  it('should create account', async () => {
    const hashSpy = jest
      .spyOn(argon, 'hash')
      .mockResolvedValue(accountStub().password);

    const result = await service.createAccount({
      name: accountStub().name,
      email: accountStub().email,
      password,
    });

    expect(hashSpy).toBeCalledWith(password);
    expect(result.email).toStrictEqual(accountStub().email);
  });

  it('should verify account', async () => {
    const verifySpy = jest.spyOn(argon, 'verify').mockResolvedValue(true);

    await service.verifyAccount(accountStub().email, password);
    expect(verifySpy).toBeCalledWith(accountStub().password, password);
  });
});
