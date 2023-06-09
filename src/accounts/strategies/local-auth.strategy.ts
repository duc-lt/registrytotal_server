import { Role } from '@accounts/enums/role.enum';
import { AccountAuthService } from '@accounts/services/account-auth.service';
import { Injectable, UnauthorizedException, mixin } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { StatusCodes } from 'src/base-interface';
import { getKeyByValue } from 'src/utils';
import { UserError } from 'src/utils/error';

export function LocalAuthStrategy(role: Role) {
  const roleKey = getKeyByValue(Role, role);

  @Injectable()
  class LocalAuthStrategyMixin extends PassportStrategy(
    LocalStrategy,
    `${roleKey.toLowerCase()}-local`,
  ) {
    constructor(readonly accountAuthService: AccountAuthService) {
      super();
    }

    async validate(username: string, password: string) {
      const account = await this.accountAuthService.validate(
        {
          username,
          password,
        },
        role,
      );
      if (!account) {
        throw new UserError(
          StatusCodes.INVALID_CREDENTIALS,
          'Tài khoản hoặc mật khẩu không đúng',
        );
      }
      return account;
    }
  }
  return mixin(LocalAuthStrategyMixin);
}
