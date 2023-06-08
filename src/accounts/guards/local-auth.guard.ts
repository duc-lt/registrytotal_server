import { Role } from '@accounts/enums/role.enum';
import { Injectable, mixin } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getKeyByValue } from 'src/utils';

export function LocalAuthGuard(role: Role) {
  const roleKey = getKeyByValue(Role, role);

  @Injectable()
  class LocalAuthGuardMixin extends AuthGuard(
    `${roleKey.toLowerCase()}-local`,
  ) {}

  return mixin(LocalAuthGuardMixin);
}
