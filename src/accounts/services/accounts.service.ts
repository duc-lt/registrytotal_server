import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '@accounts/entities/account.entity';
import { AccountRepository } from '@accounts/repositories/account.repository';
import { Role } from '@accounts/enums/role.enum';
import { CreateAccountDto } from '@accounts/dto';
import { ServiceProvider } from '@service-providers/entities/service-provider.entity';
import { ServiceProviderRepository } from '@service-providers/repositories/service-provider.repository';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: AccountRepository,
    @InjectRepository(ServiceProvider)
    private readonly providerRepository: ServiceProviderRepository,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const { username } = createAccountDto;
    const exist = await this.providerRepository.findOne({
      where: { code: username },
    });
    if (!exist) {
      throw new ForbiddenException('Tên tài khoản không hợp lệ');
    }

    const account = this.accountRepository.create({
      username,
      password: '123456',
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

  async findById(id: string) {
    return this.accountRepository.findBy({ id });
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
