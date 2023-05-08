import { Role } from '@accounts/enums/role.enum';
import { Injectable, mixin } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { getKeyByValue } from 'src/utils';

export function JwtAuthStrategy(role: Role) {
  const roleKey = getKeyByValue(Role, role);

  @Injectable()
  class JwtAuthStrategyMixin extends PassportStrategy(
    JwtStrategy,
    `${roleKey.toLowerCase()}-jwt`,
  ) {
    constructor(readonly configService: ConfigService) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey:
          role === Role.DEPARTMENT
            ? configService.get('DEPARTMENT_ACCESS_KEY')
            : configService.get('PROVIDER_ACCESS_KEY'),
      });
    }

    async validate(payload: any) {
      return payload;
    }
  }

  return mixin(JwtAuthStrategyMixin);
}
