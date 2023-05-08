import { Account } from '@accounts/entities/account.entity';

export type JwtPayload = {
  [prop in keyof Pick<Account, 'id' | 'username' | 'role'>]: Account[prop];
};
