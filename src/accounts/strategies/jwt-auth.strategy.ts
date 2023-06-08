import { Role } from '@accounts/enums/role.enum';
import { AccountAuthService } from '@accounts/services/account-auth.service';
import { AccountsService } from '@accounts/services/accounts.service';
import { JwtPayload } from '@accounts/types';
import { Injectable, UnauthorizedException, mixin } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { getKeyByValue } from 'src/utils';

export function JwtAuthStrategy(role?: Role) {
  const roleKey = getKeyByValue(Role, role);

  @Injectable()
  class JwtAuthStrategyMixin extends PassportStrategy(
    JwtStrategy,
    role ? `${roleKey.toLowerCase()}-jwt` : 'all-roles-jwt',
  ) {
    constructor(
      readonly configService: ConfigService,
      readonly accountsService: AccountsService,
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.get('ACCESS_KEY'),
      });
    }

    async validate(payload: JwtPayload) {
      const account = role
        ? await this.accountsService.findById(payload.id)
        : role === Role.SERVICE_PROVIDER
        ? await this.accountsService.findProviderById(payload.id)
        : await this.accountsService.findDepartment(payload.id);

      if (!account) {
        throw new UnauthorizedException();
      }

      return account;
    }
  }

  return mixin(JwtAuthStrategyMixin);
}
