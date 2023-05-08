import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '@accounts/entities/account.entity';
import { AccountRepository } from '@accounts/repositories/account.repository';
import { Role } from '@accounts/enums/role.enum';
import { CreateAccountDto } from '@accounts/dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: AccountRepository,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const { username } = createAccountDto;
    const duplicate = await this.accountRepository.findOne({
      where: { username },
    });
    if (duplicate) {
      throw new ForbiddenException('Tài khoản đã tồn tại');
    }
    const account = this.accountRepository.create({
      username,
      password: username.toLowerCase(),
    });

    return this.accountRepository.save(account);

    // return this.accountRepository.insert({
    //   username,
    //   password: username.toLowerCase(),
    //   role: Role.SERVICE_PROVIDER,
    // });
  }

  async findAll() {
    return this.accountRepository.find({
      where: { role: Role.SERVICE_PROVIDER },
    });
  }

  async findById(id: string) {
    return this.accountRepository.findOneBy({
      role: Role.SERVICE_PROVIDER,
      id,
    });
  }
}
