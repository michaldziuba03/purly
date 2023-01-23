import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AccountService } from '../../account/account.service';
import { AccountServiceMock } from '../../account/__tests__/mocks/account.service';
import { accountStub } from '../../account/__tests__/stubs/account.stub';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AccountService,
          useValue: AccountServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register user', async () => {
    const account = await service.register(accountStub());
    expect(account.email).toEqual(accountStub().email);
  });
});
