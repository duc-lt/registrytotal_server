import { AccountAuthService } from '@accounts/services/account-auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as LocalStrategy } from 'passport-local';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(
  LocalStrategy,
  'local',
) {
  constructor(private readonly accountAuthService: AccountAuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const account = await this.accountAuthService.validate({
      username,
      password,
    });
    if (!account) {
      throw new UnauthorizedException('Tài khoản hoặc mật khẩu không đúng');
    }

    return account;
  }
}
