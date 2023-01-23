import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from '../../account/account.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginDTO } from '../dto';
import { transformAndValidate } from '../../common/utils';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly accountService: AccountService) {
    super({ usernameField: 'email' });
  }

  private getError() {
    return new UnauthorizedException('Invalid email or password');
  }

  async validate(email: string, password: string) {
    const data = await transformAndValidate(
      LoginDTO,
      { email, password },
      this.getError(),
    );
    const account = await this.accountService.findByEmailAndPass(
      data.email,
      data.password,
    );

    if (!account) {
      throw this.getError();
    }

    return account;
  }
}
