import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from '../account.controller';
import { AccountService } from '../account.service';
import { AccountServiceMock } from './mocks/account.service';
import { accountStub } from './stubs/account.stub';
import { Account } from '../account.schema';

describe('AccountController', () => {
  let controller: AccountController;
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [{ provide: AccountService, useValue: AccountServiceMock }],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should return profile by id', async () => {
    const account = await controller.getProfile(accountStub().id);
    expect(account).toBeInstanceOf(Account);
    // We don't want password to be returned
    expect(account.password).toBeUndefined();
    expect(account.id).toEqual(accountStub().id);
  });

  it('should update profile with specific id', async () => {
    const newName = 'Jane Doe';
    const account = await controller.updateProfile(accountStub().id, {
      name: newName,
    });

    expect(account.password).toBeUndefined();
    expect(account.id).toEqual(accountStub().id);
    expect(account.name).toEqual(newName);
  });
});
