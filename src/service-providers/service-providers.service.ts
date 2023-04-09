import { Injectable } from '@nestjs/common';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';

@Injectable()
export class ServiceProvidersService {
  create(createServiceProviderDto: CreateServiceProviderDto) {
    return 'This action adds a new serviceProvider';
  }

  findAll() {
    return `This action returns all serviceProviders`;
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
