import { ROLE_KEY } from '@accounts/decorators/role.decorator';
import { Role } from '@accounts/enums/role.enum';
import { RequestWithUser } from '@accounts/types';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRole = this.reflector.getAllAndOverride<Role>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<RequestWithUser>();
    return requiredRole === user.role;
  }
}
