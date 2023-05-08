import { Account } from '@accounts/entities/account.entity';

export type RequestWithUser = Request & {
  user: Account;
};
