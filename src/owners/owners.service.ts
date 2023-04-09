import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnersService {
  create(createOwnerDto: CreateOwnerDto) {
    return 'This action adds a new owner';
  }

  findAll() {
    return `This action returns all owners`;
  }

  findOne(id: string) {
    return `This action returns a #${id} owner`;
  }

  update(id: string, updateOwnerDto: UpdateOwnerDto) {
    return `This action updates a #${id} owner`;
  }

  remove(id: string) {
    return `This action removes a #${id} owner`;
  }
}
