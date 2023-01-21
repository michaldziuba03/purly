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
        { provide: AccountRepository, useValue: AccountRepositoryMock },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    repository = module.get<AccountRepository>(AccountRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  const plainPassword = '12345678';

  it('should return false if user does not exist', async () => {
    const exists = service.accountExists(accountStub().email);
    expect(exists).resolves.toBeFalsy();
  });

  it('should create account', async () => {
    const hashSpy = jest
      .spyOn(argon, 'hash')
      .mockResolvedValue(accountStub().password);

    const result = await service.createAccount({
      name: accountStub().name,
      email: accountStub().email,
      password: plainPassword,
    });

    expect(hashSpy).toBeCalledWith(plainPassword);
    expect(result.email).toStrictEqual(accountStub().email);
  });

  it('should find account and verify password', async () => {
    const verifySpy = jest.spyOn(argon, 'verify').mockResolvedValue(true);

    const account = await service.findByEmailAndPass(
      accountStub().email,
      plainPassword,
    );

    expect(account).toEqual(accountStub());
    expect(verifySpy).toBeCalledWith(accountStub().password, plainPassword);
  });

  it('should find account by id', async () => {
    const account = service.findAccountById(accountStub().id);
    expect(account).resolves.toEqual(accountStub());
  });

  it('should find user by id and update', async () => {
    const newName = 'Michal';
    const account = await service.updateAccountById(accountStub().id, {
      name: newName,
    });

    expect(account.id).toEqual(accountStub().id);
    expect(account.name).toEqual(newName);
  });
});
