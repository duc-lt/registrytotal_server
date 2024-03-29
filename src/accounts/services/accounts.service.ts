import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '@accounts/entities/account.entity';
import { AccountRepository } from '@accounts/repositories/account.repository';
import { Role } from '@accounts/enums/role.enum';
import { CreateAccountDto } from '@accounts/dto';
import { ServiceProvider } from '@service-providers/entities/service-provider.entity';
import { ServiceProviderRepository } from '@service-providers/repositories/service-provider.repository';
import { nonAccentVietnamese } from 'src/utils/string';
import { AddressRepository } from '@addresses/repositories/address.repository';
import { Address } from '@addresses/entities/address.entity';
import { AddressesService } from '@addresses/services/addresses.service';
import { Raw } from 'typeorm';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: AccountRepository,
    @InjectRepository(ServiceProvider)
    private readonly providerRepository: ServiceProviderRepository,
    @InjectRepository(Address)
    private readonly addressRepository: AddressRepository,
    private readonly addressesService: AddressesService,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const {
      username,
      password,
      // streetAddress,
      // provinceCode,
      // districtCode,
      // communeCode,
    } = createAccountDto;
    const noAccentVietnamese = nonAccentVietnamese(username);
    const exist = await this.providerRepository.findOne({
      where: { code: username },
    });
    if (exist) {
      throw new ForbiddenException('Tên tài khoản đã tồn tại');
    }

    const account = this.accountRepository.create({
      username: noAccentVietnamese.replace(/\s/g, ''),
      password,
    });

    // const address = await this.addressesService.create({
    //   streetAddress,
    //   provinceCode,
    //   districtCode,
    //   communeCode,
    // });
    const addresses = await this.addressRepository.find({
      select: { id: true },
    });
    const savedAccount = await this.accountRepository.save(account);

    const serviceProvider = this.providerRepository.create({
      account: {
        id: savedAccount.id,
      },
      code: savedAccount.username,
      address: {
        id: addresses[Math.round(Math.random() * addresses.length)].id,
      },
    });

    await this.providerRepository.save(serviceProvider);

    // Truy vấn lại thông tin account vừa tạo để lấy thêm thông tin provider
    return this.accountRepository.findOne({
      where: { id: savedAccount.id },
      relations: ['provider'],
    });

    // return this.accountRepository.save(account);
  }

  async findAllProviders() {
    return this.accountRepository.find({
      relations: {
        provider: true,
      },
      where: { role: Role.SERVICE_PROVIDER },
      order: { createdAt: 'DESC' },
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
