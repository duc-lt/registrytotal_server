import { Injectable } from '@nestjs/common';
import { CreateServiceProviderDto } from '../dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from '../dto/update-service-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceProvider } from '@service-providers/entities/service-provider.entity';
import { ServiceProviderRepository } from '@service-providers/repositories/service-provider.repository';

@Injectable()
export class ServiceProvidersService {
  constructor(
    @InjectRepository(ServiceProvider)
    private readonly providerRepository: ServiceProviderRepository,
  ) {}
  create(createServiceProviderDto: CreateServiceProviderDto) {
    return 'This action adds a new serviceProvider';
  }

  findAll() {
    return `This action returns all serviceProviders`;
  }

  async findByCode(code: string) {
    return this.providerRepository.findOneBy({ code });
  }

  findOne(id: string) {
    return `This action returns a #${id} serviceProvider`;
  }

  update(id: string, updateServiceProviderDto: UpdateServiceProviderDto) {
    return `This action updates a #${id} serviceProvider`;
  }

  remove(id: string) {
    return `This action removes a #${id} serviceProvider`;
  }
}
