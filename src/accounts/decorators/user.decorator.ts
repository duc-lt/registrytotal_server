import { Account } from '@accounts/entities/account.entity';
import { RequestWithUser } from '@accounts/types';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (_, ctx: ExecutionContext): Account => {
    const req = ctx.switchToHttp().getRequest<RequestWithUser>();
    return req.user;
  },
);
