import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  create(createCarDto: CreateCarDto) {
    return 'This action adds a new car';
  }

  findAll() {
    return `This action returns all cars`;
  }

  findOne(id: string) {
    return `This action returns a #${id} car`;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: string) {
    return `This action removes a #${id} car`;
  }
}
