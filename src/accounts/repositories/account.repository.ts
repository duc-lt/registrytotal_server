import { Account } from '@accounts/entities/account.entity';
import { Repository } from 'typeorm';

export class AccountRepository extends Repository<Account> {}
