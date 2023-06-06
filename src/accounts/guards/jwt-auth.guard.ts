import { Role } from '@accounts/enums/role.enum';
import { Injectable, mixin } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getKeyByValue } from 'src/utils';

export function JwtAuthGuard(role?: Role) {
  const roleKey = getKeyByValue(Role, role);

  @Injectable()
  class JwtAuthGuardMixin extends AuthGuard(
    role ? `${roleKey.toLowerCase()}-jwt` : 'all-roles-jwt',
  ) {}

  return mixin(JwtAuthGuardMixin);
}
