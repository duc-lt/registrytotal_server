import { Injectable } from '@nestjs/common';
import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';
import { XlsxService } from 'src/xlsx/services/xlsx.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '@cars/entities/car.entity';
import { CarRepository } from '@cars/repositories/car.repository';

@Injectable()
export class CarsService {
  constructor(
    private readonly xlsxService: XlsxService,
    @InjectRepository(Car) private readonly carRepository: CarRepository,
  ) {}

  async create(path: string) {
    const rows = await this.xlsxService.read(path);
    const cars = await Promise.all(rows.map(async (row) => {
      const {
        owner,
        specs: { maker, model, version },
        registrationInfo: {
          certNumber,
          createdAt,
          registrationNumber,
          registryProvince,
        },
      } = row;

      const car = this.carRepository.create();
      return car;
    }));

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
