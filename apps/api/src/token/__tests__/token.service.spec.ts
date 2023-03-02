import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from '../token.service';
import {
  ResetTokenRepository,
  VerificationTokenRepository,
} from '../token.repository';
import { TokenRepositoryMock } from './mocks/token.repository.mock';
import { accountStub } from '../../account/__tests__/stubs/account.stub';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ResetTokenRepository,
          useValue: TokenRepositoryMock,
        },
        {
          provide: VerificationTokenRepository,
          useValue: TokenRepositoryMock,
        },
        TokenService,
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return reset token', async () => {
    const token = await service.createResetToken(
      accountStub().id,
      accountStub().email,
    );

    console.log(token);
    expect(token).toBeDefined();
    expect(typeof token).toEqual('string');
  });

  it('should return verification token', async () => {
    const token = await service.createVerificationToken(
      accountStub().id,
      accountStub().email,
    );

    console.log(token);
    expect(token).toBeDefined();
    expect(typeof token).toEqual('string');
  });
});
