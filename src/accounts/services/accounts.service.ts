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
  }

  async findAllProviders() {
    return this.accountRepository.find({
      relations: {
        provider: true,
      },
      where: { role: Role.SERVICE_PROVIDER },
    });
  }

  async findProviderById(id: string) {
    return this.accountRepository.findOne({
      relations: {
        provider: true,
      },
      where: {
        role: Role.SERVICE_PROVIDER,
        id,
      },
    });
  }

  async findDepartment(id: string) {
    return this.accountRepository.findOneBy({ id, role: Role.DEPARTMENT });
  }
}
