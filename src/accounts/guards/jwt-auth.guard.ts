import { Role } from '@accounts/enums/role.enum';
import { Injectable, mixin } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getKeyByValue } from 'src/utils';

export function JwtAuthGuard(role: Role) {
  const roleKey = getKeyByValue(Role, role);

  @Injectable()
  class JwtAuthGuardMixin extends AuthGuard(`${roleKey.toLowerCase()}-jwt`) {}

  return mixin(JwtAuthGuardMixin);
}
